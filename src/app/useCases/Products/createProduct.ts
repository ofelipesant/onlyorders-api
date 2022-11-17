import { Request, Response } from 'express'
import { Product } from '../../models/Product'

export async function createProduct(req: Request, res: Response) {
    try{
        const imagePath = req.file?.filename
        const { name, description, price, category, ingredients } = req.body

        if(!name){
            return res.status(400).json({
                error: 'Name is required',
            })
        } else if(!description){
            return res.status(400).json({
                error: 'Description is required',
            })
        } else if(!price){
            return res.status(400).json({
                error: 'Price is required',
            })
        } else if(!category){
            return res.status(400).json({
                error: 'Category is required',
            })
        }

        const product = await Product.create({
            name,
            description,
            imagePath: imagePath || '',
            price: Number(price),
            category,
            ingredients: ingredients ? JSON.parse(ingredients) : []
        })

        res.status(201).json(product)

    } catch(error){
        console.error(error)
        res.sendStatus(500)
    }
}