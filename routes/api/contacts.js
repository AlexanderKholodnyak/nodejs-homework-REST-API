const express = require('express')
const router = express.Router()
const {
  listContacts,
  getContactById,
  removeContact,
  addContact,
} = require('../../model/index.js')


router.get('/', async (req, res, next) => {
  try {
    const contacts = await listContacts();
    return res.json({
      status: 'success',
      code: 200,
      data: {
        contacts,
      },
    })
  } catch (e) {
    next(e)
  }
})

router.get('/:id', async (req, res, next) => {
  try {
    const contact = await getContactById(req.params.id)
    if (contact) {
      return res.json({
        status: 'success',
        code: 200,
        data: {
          contact,
        },
      })
    } else {
      return res.status(404).json({
        status: 'error',
        code: 404,
        data: 'Not Found',
      })
    }
  } catch (e) {
    next(e)
  }
})

router.post('/', async (req, res, next) => {
   try {
    const cat = await addContact(req.body)
    return res.status(201).json({
      status: 'success',
      code: 201,
      data: {
        cat,
      },
    })
  } catch (e) {
    next(e)
  }
})

router.delete('/:id', async (req, res, next) => {
  try {
    const contact = await removeContact(req.params.id)
    if (contact) {
      return res.json({
        status: 'success',
        code: 200,
        data: {
          contact,
        },
      })
    } else {
      return res.status(404).json({
        status: 'error',
        code: 404,
        data: 'Not Found',
      })
    }
  } catch (e) {
    next(e)
  }
})

router.patch('/:contactId', async (req, res, next) => {
  // '/:id/vaccinated',
  // validate.updateStatusCat,
  // async (req, res, next) => {
  //   try {
  //     const cat = await Cats.update(req.params.id, req.body)
  //     if (cat) {
  //       return res.json({
  //         status: 'success',
  //         code: 200,
  //         data: {
  //           cat,
  //         },
  //       })
  //     } else {
  //       return res.status(404).json({
  //         status: 'error',
  //         code: 404,
  //         data: 'Not Found',
  //       })
  //     }
  //   } catch (e) {
  //     next(e)
  //   }
  // },
})

module.exports = router
