import { Router } from 'express'

export default Router({ mergeParams: true })
    .get("/companies")
    .get("/companies/:id")
    .get("/companies/:id/doctors")
    .get("/companies/:id/doctors/:doc_id")
    .get("/orders")
    .get("/orders/:id")
    .get("/orders/:id/reject")