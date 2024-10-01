const connection = require("../config/db")

function storeTag(tag) {
  return new Promise((resolve, reject) => {
    let query = "INSERT INTO tags(text) values(?)";

    connection.query(query, tag, (err, results) => {
      if (err) {
        return reject(err); // Proper error handling
      }
      resolve(results.insertId); // Return the insertId if successful
    });
  });
}

function storePostTags(idTag, idPost) {
  return new Promise((resolve, reject) => {
    let params = Array(
      idPost, idTag
    )
    let query = "INSERT INTO post_tags(id_post,id_tag) VALUES(?,?)"

    connection.query(query, params, (err, results) => {
      if (err) {
        return reject(err); // Proper error handling
      }
      resolve(results);
    })
  })
}

async function storePost(request, response) {
  let { tag_text, tag_ids, id_user, title } = request.body
  let newTags = []
  let tagsFromPost = []

  if (tag_text.length > 0) {
    for (const tag of tag_text) {
      const id = await storeTag(tag)
      newTags.push(id)
    }
    tagsFromPost = newTags.length > 0 ? tags = tag_ids.concat(newTags) : tag_ids
  }

  let params = Array(
    title,
    id_user
  )

  let query = "INSERT INTO posts(title,id_user) VALUES(?,?)"

  connection.query(query, params, (err, results) => {
    if (results) {
      let idPost = results.insertId

      if (tagsFromPost.length > 0) {
        for (const idTag of tagsFromPost) {
          storePostTags(idTag, idPost)
        }
      }

      response
        .status(201)
        .json({
          success: true,
          message: "Sucesso!",
          data: results
        })
    } else {
      response
        .status(400)
        .json({
          success: false,
          message: "Sem sucesso!",
          data: err
        })
    }
  })
}

module.exports = {
  storePost
}