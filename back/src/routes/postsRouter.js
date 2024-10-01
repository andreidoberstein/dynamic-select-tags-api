const router = require('express').Router()

const { listTags } = require('../controllers/tagsController')
const { storePost } = require('../controllers/postController')

router.get('/tags/listar', listTags)
router.post('/post/salvar', storePost)

module.exports = router;