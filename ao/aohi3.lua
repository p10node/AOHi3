-- Copyright 2024 pierreneter. All rights reserved.

local ao = require('ao')
local json = require('json')
local bint = require('.bint')(256)

Profiles = Profiles or {}
Username = Username or {}
Follow = Follow or {}
Posts = Posts or {}
Notifications = Notifications or {}
Like = Like or {}
Comment = Comment or {}

local utils = {
  add = function(a, b)
    return tostring(bint(a) + bint(b))
  end,
  subtract = function(a, b)
    return tostring(bint(a) - bint(b))
  end
}


-- profile           Profile          CREATE, EDIT
-- get-profile       GetProfile       GET
-- post              Post             CREATE, EDIT
-- get-post          GetPost          GET
-- get-posts         GetPosts         GET
-- delete-post       DeletePost       DELETE
-- like              Like             CREATE
-- unlike            Unkike           DELETE
-- comment           Comment          CREATE
-- delete-comment    DeleteComment    DELETE
-- get-notifications GetNotifications GET
-- search            Search           GET
-- recommended       Recommended      GET


math.randomseed(os.time()) -- Seed the random number generator

local function generateRandomID(length)
  local characters = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz'
  local randomID = ''
  for i = 1, length do
    local rand = math.random(#characters)
    randomID = randomID .. characters:sub(rand, rand)
  end
  return randomID
end




-- 1. User Profiles
Handlers.add("profile", Handlers.utils.hasMatchingTag("Action", "Profile"), function(msg)
  local data, err = json.decode(msg.Data)
  if not data or err then
    print("Error decoding JSON data: ", err)
    return
  end

  Profiles[msg.From] = Profiles[msg.From] or {
    lastUpdated = msg.Timestamp,

    avatar = data.avatar or "",
    banner = data.banner or "",

    name = data.name or msg.From,
    github = data.github or "",
    url = data.url or "",

    showGithub = data.showGithub or true,
    showUrl = data.url or true,
  }

  Profiles[msg.From].lastUpdated = msg.Timestamp
  Profiles[msg.From].name = data.name or msg.From
  Profiles[msg.From].github = data.github or ""
  Profiles[msg.From].url = data.url or ""

  Profiles[msg.From].avatar = data.avatar or ""
  Profiles[msg.From].banner = data.banner or ""

  -- 6. Privacy control
  Profiles[msg.From].showGithub = data.showGithub or true
  Profiles[msg.From].showUrl = data.url or true

  Handlers.utils.reply("profile-updated")(msg)

  local profile = Profiles[msg.From]
  if profile.showGithub == false then
    profile.github = ""
  end
  if profile.showUrl == false then
    profile.url = ""
  end

  ao.send({
    Target = msg.From,
    Data = json.encode({ success = true, profile = profile })
  })
end)


Handlers.add("get-profile", Handlers.utils.hasMatchingTag("Action", "GetProfile"), function(msg)
  local data, err = json.decode(msg.Data)
  if not data or err then
    print("Error decoding JSON data: ", err)
    return
  end

  local profile = Profiles[data.address]

  if not profile then
    print("not found")
    return
  end

  -- 6. Privacy control
  if profile.showGithub == false then
    profile.github = ""
  end
  if profile.showUrl == false then
    profile.url = ""
  end

  ao.send({
    Target = msg.From,
    Data = json.encode({ success = true, profile = profile })
  })
end)


-- 4. Content Sharing
Handlers.add("post", Handlers.utils.hasMatchingTag("Action", "Post"), function(msg)
  local data, err = json.decode(msg.Data)
  if not data or err then
    print("Error decoding JSON data: ", err)
    return
  end

  local post = nil

  if data.postId ~= nil then
    post = Posts[data.postId]
    if post.owner ~= msg.From then
      print("you are not the author")
      return
    end
  end

  post = post or {
    lastUpdated = msg.Timestamp,
    versions = {},
    attach = {},
    owner = msg.From,
    like = {},
    comment = {},
    hide = false,
    deleted = false -- TO-DO: handle id to delete this field
  }

  -- post ediable, get latest version by array length
  table.insert(post.versions, data.content);
  post.owner = msg.From
  post.hide = data.hide
  post.lastUpdated = msg.Timestamp

  if data.attach then
    post.attach = data.attach
  end

  if data.postId ~= nil then
    Posts[data.postId] = post
  else
    table.insert(Posts, post)
  end



  Handlers.utils.reply("posted")(msg)

  local index = data.postId or #Posts

  table.insert(Notifications[msg.From], { code = "post", data = index })

  ao.send({
    Target = msg.From,
    Data = json.encode({ success = true, postId = index })
  })
end)


Handlers.add("get-post", Handlers.utils.hasMatchingTag("Action", "GetPost"), function(msg)
  local data, err = json.decode(msg.Data)
  if not data or err then
    print("Error decoding JSON data: ", err)
    return
  end

  local post = Posts[data.postId]

  if not post then
    print("not found")
    return
  end

  if post.Posts then
    print("deleted")
    return
  end

  Handlers.utils.reply("return-post")(msg)

  ao.send({
    Target = msg.From,
    Data = json.encode({ success = true, post = post })
  })
end)


Handlers.add("get-posts", Handlers.utils.hasMatchingTag("Action", "GetPosts"), function(msg)
  local data, err = json.decode(msg.Data)
  if not data or err then
    print("Error decoding JSON data: ", err)
    return
  end

  -- TO-DO: pagination
  Handlers.utils.reply("return-posts")(msg)

  local filteredPosts = {}
  for _, post in ipairs(Posts) do
    if not post.deleted then
      table.insert(filteredPosts, post)
    end
  end

  ao.send({
    Target = msg.From,
    Data = json.encode({ success = true, posts = filteredPosts })
  })
end)


Handlers.add("delete-post", Handlers.utils.hasMatchingTag("Action", "DeletePost"), function(msg)
  local data, err = json.decode(msg.Data)
  if not data or err then
    print("Error decoding JSON data: ", err)
    return
  end

  local post = Posts[data.postId]

  if not post then
    print("not found")
    return
  end

  if post.owner ~= msg.From then
    print("you are not the author")
    return
  end

  -- TO-DO: use remove instead
  post.lastUpdated = msg.Timestamp
  post.deleted = true
  Posts[data.postId] = post

  -- table.remove(Posts, data.postId)

  Handlers.utils.reply("post-deleted")(msg)

  table.insert(Notifications[msg.From], { code = "delete-post", data = data.postId })

  ao.send({
    Target = msg.From,
    Data = json.encode({ success = true, postId = data.postId })
  })
end)


-- 3. Communication
Handlers.add("like", Handlers.utils.hasMatchingTag("Action", "Like"), function(msg)
  local data, err = json.decode(msg.Data)
  if not data or err then
    print("Error decoding JSON data: ", err)
    return
  end

  local post = Posts[data.postId]

  if not post then
    print("not found")
    return
  end

  post.like[msg.From] = true
  Posts[data.postId] = post

  Like[msg.From] = Like[msg.From] or {
    posts = {}
  }

  if not Like[msg.From].posts[data.postId] then
    table.insert(Like[msg.From].posts, data.postId)
  end

  Handlers.utils.reply("liked")(msg)

  table.insert(Notifications[msg.From], { code = "like", data = data.postId })
  table.insert(Notifications[post.owner], { code = "gotLike", postId = data.postId, sender = msg.From })

  ao.send({
    Target = msg.From,
    Data = json.encode({ success = true })
  })
end)


Handlers.add("unlike", Handlers.utils.hasMatchingTag("Action", "Unkike"), function(msg)
  local data, err = json.decode(msg.Data)
  if not data or err then
    print("Error decoding JSON data: ", err)
    return
  end

  local post = Posts[data.postId]

  if not post then
    print("not found")
    return
  end

  post.like[msg.From] = false
  Posts[data.postId] = post

  if Like[msg.From] and Like[msg.From].posts[data.postId] then
    for i, v in ipairs(Like[msg.From].posts) do
      if v == data.postId then
        table.remove(Like[msg.From].posts, i)
        break
      end
    end
  end

  Handlers.utils.reply("unliked")(msg)


  ao.send({
    Target = msg.From,
    Data = json.encode({ success = true })
  })
end)


Handlers.add("comment", Handlers.utils.hasMatchingTag("Action", "Comment"), function(msg)
  local data, err = json.decode(msg.Data)
  if not data or err then
    print("Error decoding JSON data: ", err)
    return
  end

  local post = Posts[data.postId]


  if not post then
    print("not found")
    return
  end

  local id = generateRandomID(10)
  local comment = {
    postId = data.postId,
    id = id,
    content = data.content,
    owner = msg.From,
  }
  table.insert(Posts[data.postId].comment, comment)

  Comment[msg.From] = Comment[msg.From] or {
    comments = {}
  }

  Comment[msg.From].comments[comment.id] = comment

  table.insert(Notifications[msg.From], { code = "comment", data = data.postId })
  table.insert(Notifications[post.owner], { code = "gotComment", postId = data.postId, sender = msg.From })

  Handlers.utils.reply("commented")(msg)

  ao.send({
    Target = msg.From,
    Data = json.encode({ success = true, commentId = comment.id, postId = data.postId })
  })
end)

Handlers.add("delete-comment", Handlers.utils.hasMatchingTag("Action", "DeleteComment"), function(msg)
  local data, err = json.decode(msg.Data)
  if not data or err then
    print("Error decoding JSON data: ", err)
    return
  end

  local commentIndex = nil
  for i, comment in ipairs(Posts[data.postId].comment) do
    if comment.id == data.commentId and comment.owner == msg.From then
      commentIndex = i
      break
    end
  end

  if commentIndex then
    table.remove(Posts[data.postId].comment, commentIndex)
  end

  Comment[msg.From].comments[data.commentId] = nil


  Handlers.utils.reply("comment-deleted")(msg)

  ao.send({
    Target = msg.From,
    Data = json.encode({ success = true })
  })
end)


-- 2. Connectivity
Handlers.add("follow", Handlers.utils.hasMatchingTag("Action", "Follow"), function(msg)
  local data, err = json.decode(msg.Data)
  if not data or err then
    print("Error decoding JSON data: ", err)
    return
  end

  if msg.From == msg.Data then
    print("same user")
    return
  end

  Follow[msg.From] = Follow[msg.From] or {
    following = {},
    followers = {}
  }

  Follow[data.follow] = Follow[data.follow] or {
    following = {},
    followers = {}
  }

  table.insert(Follow[msg.From].following, data.follow)
  table.insert(Follow[data.follow].followers, msg.From)

  table.insert(Notifications[data.follow], { code = "follow", data = msg.From })

  Handlers.utils.reply("followed")(msg)

  ao.send({
    Target = msg.From,
    Data = json.encode({ success = true })
  })
end)


Handlers.add("unfollow", Handlers.utils.hasMatchingTag("Action", "Unfollow"), function(msg)
  local data, err = json.decode(msg.Data)
  if not data or err then
    print("Error decoding JSON data: ", err)
    return
  end

  if msg.From == msg.Data then
    print("same user")
    return
  end

  Follow[msg.From] = Follow[msg.From] or {
    following = {},
    followers = {}
  }

  Follow[data.follow] = Follow[data.follow] or {
    following = {},
    followers = {}
  }

  for i, v in ipairs(Follow[msg.From].following) do
    if v == msg.Data then
      table.remove(Follow[msg.From].following, i)
      break
    end
  end
  for i, v in ipairs(Follow[data.follow].follower) do
    if v == msg.From then
      table.remove(Follow[data.follow].follower, i)
      break
    end
  end

  table.insert(Notifications[data.follow], { code = "unfollow", data = msg.From })

  Handlers.utils.reply("unfollowed")(msg)

  ao.send({
    Target = msg.From,
    Data = json.encode({ success = true })
  })
end)


-- 5. Notifications
Handlers.add("get-notifications", Handlers.utils.hasMatchingTag("Action", "GetNotifications"), function(msg)
  local data, err = json.decode(msg.Data)
  if not data or err then
    print("Error decoding JSON data: ", err)
    return
  end

  local notifications = Notifications[msg.From]

  -- TO-DO: pagination
  Handlers.utils.reply("return-notifications")(msg)

  ao.send({
    Target = msg.From,
    Data = json.encode({ success = true, notifications = notifications })
  })
end)


-- 7. Search Posts
Handlers.add("search", Handlers.utils.hasMatchingTag("Action", "Search"), function(msg)
  local data, err = json.decode(msg.Data)
  if not data or err then
    print("Error decoding JSON data: ", err)
    return
  end

  local searchResults = {}
  for _, post in ipairs(Posts) do
    if not post.deleted then
      local latestVersion = post.versions[#post.versions]
      if string.find(latestVersion, data.query) then
        table.insert(searchResults, post)
      end
    end
  end

  -- TO-DO: pagination
  Handlers.utils.reply("return-search-posts")(msg)

  ao.send({
    Target = msg.From,
    Data = json.encode({ success = true, posts = searchResults })
  })
end)


-- 8. Recommendation Posts
Handlers.add("recommended", Handlers.utils.hasMatchingTag("Action", "Recommended"), function(msg)
  local data, err = json.decode(msg.Data)
  if not data or err then
    print("Error decoding JSON data: ", err)
    return
  end

  local recommendedPosts = {}

  for _, post in ipairs(Posts) do
    if not post.deleted then
      local latestVersion = post.versions[#post.versions]
      if string.find(latestVersion, data.query) then
        table.insert(recommendedPosts, post)
      end
    end
  end

  -- Sort by length of like or comment
  table.sort(recommendedPosts, function(a, b)
    local aLikes = #a.like
    local aComments = #a.comment
    local bLikes = #b.like
    local bComments = #b.comment
    return (aLikes + aComments) > (bLikes + bComments)
  end)


  Handlers.utils.reply("return-recommended-posts")(msg)

  ao.send({
    Target = msg.From,
    Data = json.encode({ success = true, posts = recommendedPosts })
  })
end)
