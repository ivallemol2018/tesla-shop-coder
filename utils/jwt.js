const jwt = require('jsonwebtoken')
const keys = require('./../config/keys');

const signToken = (_id, email) => {
    if (!keys.JWT_SECRET_SEED) {
        throw new Error('No hay semilla par JWT, verificar las variable de entorno')
    }

    return jwt.sign(
        // payload
        { _id, email },
        //Seed
        keys.JWT_SECRET_SEED,
        //Opciones
        { expiresIn: '30d' }
    )
}

const isValidToken = (token ) =>{
    if(!keys.JWT_SECRET_SEED){
        throw new Error('No hay semilla de JWT - Revisar variables de entorno')
    }

    if(token.length <= 0){
        return Promise.reject('JWT no es valido')
    }

    return new Promise((resolve,reject) =>{
        try {
            jwt.verify(token, keys.JWT_SECRET_SEED || '',(err,payload) =>{
                if(err) return reject('JWT no es valido');

                const { _id } = payload

                resolve(_id)

            })
        } catch(error){

        }
    })

}

module.exports = {
    signToken,
    isValidToken
}
