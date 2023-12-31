import express from "express"
import { categoriesController } from "./controllers/categoriesControl"
import { coursesController } from "./controllers/coursesControl"
import { episodesController } from "./controllers/episodesControl"
import { authController } from "./controllers/authControl"
import { ensureAuth, ensureAuthViaQuery } from "./middlewares/auth"
import { favoritesController } from "./controllers/favoritesControl"
import { likesController } from "./controllers/likesControl"
import { userController } from "./controllers/usersControl"

const router = express.Router()
router.post('/auth/register', authController.register)
router.post('/auth/login', authController.login)

router.get('/categories', ensureAuth, categoriesController.index)
router.get('/categories/:id', ensureAuth, categoriesController.show)

router.get('/courses/featured', ensureAuth, coursesController.featured)
router.get('/courses/newest', coursesController.newest)
router.get('/courses/popular', ensureAuth, coursesController.popular)
router.get('/courses/search', ensureAuth, coursesController.search)
router.get('/courses/:id', ensureAuth, coursesController.show)

router.get('/episodes/stream', ensureAuthViaQuery, episodesController.stream)
router.get('/episodes/:id/watchTime', ensureAuth, episodesController.getWatchTime)
router.post('/episodes/:id/watchTime', ensureAuth, episodesController.setWatchTime)

router.get('/favorites', ensureAuth, favoritesController.index)
router.post('/favorites',ensureAuth,favoritesController.save)
router.delete('/favorites/:id',ensureAuth,favoritesController.delete)

router.post('/likes', ensureAuth, likesController.save)
router.delete('/likes/:id', ensureAuth, likesController.delete)

router.get('/watching', ensureAuth, userController.watching)

router.get('/account', ensureAuth, userController.show)
router.put('/account', ensureAuth, userController.update)
router.put('/accountPassword', ensureAuth, userController.updatePassword)

export { router }