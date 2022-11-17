import { Request, Response } from 'express'
import { Product } from '../../models/Product'

export async function listProductsByCategory(req: Request, res: Response) {
    try{
        const { id } = req.params
        const products = await Product.find().where('category').equals(id)
        res.status(200).json(products)
    } catch(error){
        console.error(error)
        res.sendStatus(500)
    }

}