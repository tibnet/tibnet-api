import { UserType } from '@prisma/client';
import { verify } from '@services/jwt.service';
import { Payload } from '@models/payload';
import catchAsync from '@utils/catchAsync';

export default (...types: UserType[]) => {

    return catchAsync(async (req, res, next) => {
        
        let token = req.header('authorization')

        if (!token) {
            return res.status(401).send({
                message: 'Token not provided'
            })
        }

        try {
            let payload: Payload = await verify(token)

            res.locals.payload = payload

            if (types.includes(payload.role)) {
                next()
            }
            else {
                res.status(403).send({
                     message: 'Access denied. Required role ' + types + ' is missing'
                })
            }
        }
        catch(err) {
            console.log(err)
            return res.status(401).send({ 
                message: 'Invalid token'
            })
        }
    })
}

