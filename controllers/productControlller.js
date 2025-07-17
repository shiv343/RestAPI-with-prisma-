const { PrismaClient } = require('../generated/prisma');
const prisma = new PrismaClient();

exports.createProduct = async (req, res ) => {
    try {
        if(!req.body.name){
            return res.status(422), json({ error: " Name is required"})
        }

        if(!req.body.price){
            return res.status(422), json({ error: " Price is required"})
        } else {
            if(typeof req.body.price !== 'number' || res.body.price < 0){
                return res.status(422).json({error :'Price must be  a non-negative number '})
            }
        }
        if(!res.body.categoryId){
            return res.status(422).json({ error:'Category id is required'})
        } else {
            if (! await prisma.category.findUnique({where:{id:parseInt(res.body.categoryId)}})){
                return res.status(422).json({error:'Category id not found'})
            }
        }
        const newProduct = await prisma.product.create({
            data:req.body
        })

    } catch (error){
        return res.status(500).json({error:error.message})
    }
}

exports.getProducts = async( req , res,) => {
    try {
         const  products = await prisma.product.findMany({
            include: { 
                category: {
                    select:{
                        id: true,
                        name: true,
                    }
                }

            }
    })

         return res.status(200).json(products)
    } catch (error){
          return res.status(500).json({error:error.message})
    }
}