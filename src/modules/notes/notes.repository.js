const { client } = require('../../config/db');

const createNote = async ({ title, content, user_id }) => {
    const result = await client.query(
        'INSERT INTO notes (title, content, user_id) VALUES ($1, $2, $3) RETURNING*', [title, content, user_id]
    );
    return result.rows[0];
}

const getAllNotes = async ({ date, user_id }) => {
    let query = `SELECT * FROM notes WHERE user_id = $1`
    const values = [user_id];

    if (date) {
        query += ` AND DATE(created_at) = ($2)`
        values.push(`${date}`);
    }
    const result = await client.query(query, values);
    return result.rows
};

const getNote = async ({id, user_id}) => {
    const result = await client.query(`SELECT * FROM notes WHERE user_id = ($1) AND id = ($2)`, [user_id, id]);
    return result.rows[0];
};

const updateNote = async ({title, content, user_id, id}) => {
 
    let query = `UPDATE notes SET `;
    const values = []; 
    const updates = [];
    let index = 1;
    if(title){
        updates.push(`title = ($${index})`);
        values.push(title);
        index++;
    }
    if(content){
        updates.push(`content = ($${index})`);
        values.push(content);
        index++;
    }
    query += updates.join(", ")
    query += ` WHERE user_id = ($${index}) AND id = ($${index + 1}) RETURNING *`
    values.push(user_id);
    values.push(id);
    const result = await client.query(query, values);
    return result.rows[0];
};

const deleteNote = async ({user_id, id}) => {
    const result = await client.query(
        `DELETE FROM notes WHERE id = ($1) AND user_id = ($2) RETURNING *`, [id, user_id]
    );
    return result.rows[0];
};
module.exports = {
    createNote, getNote, getAllNotes, updateNote, deleteNote
} 