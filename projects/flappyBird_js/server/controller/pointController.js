import { pool } from "../db.js";

export const getPoint = async(req, res) => {
    const [result] = await pool.query(
        `SELECT * FROM bestScore `
    )
    res.json(result[0])
}

export const updatePoint = async(req, res) => {
    const [result] = await pool.query(
        `UPDATE bestScore SET ?;`,[req.body],
    )
    res.json(result)
}