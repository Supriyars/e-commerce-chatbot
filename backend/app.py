from flask import Flask, request, jsonify
from flask_cors import CORS
import sqlite3

app = Flask(__name__)
CORS(app)

DATABASE = 'products.db'

def init_db():
    conn = sqlite3.connect(DATABASE)
    cur = conn.cursor()
    cur.execute("""CREATE TABLE IF NOT EXISTS products (
                    id INTEGER PRIMARY KEY,
                    name TEXT,
                    category TEXT,
                    price REAL,
                    description TEXT
                )""")
    for i in range(1, 101):
        cur.execute("INSERT INTO products (name, category, price, description) VALUES (?, ?, ?, ?)",
                    (f"Product {i}", "Electronics", i * 10, f"Description for product {i}"))
    conn.commit()
    conn.close()

@app.route('/search', methods=['GET'])
def search():
    query = request.args.get('q', '')
    conn = sqlite3.connect(DATABASE)
    cur = conn.cursor()
    cur.execute("SELECT * FROM products WHERE name LIKE ?", (f'%{query}%',))
    results = cur.fetchall()
    conn.close()
    return jsonify(results)

@app.route('/product/<int:product_id>', methods=['GET'])
def get_product(product_id):
    conn = sqlite3.connect(DATABASE)
    cur = conn.cursor()
    cur.execute("SELECT * FROM products WHERE id = ?", (product_id,))
    product = cur.fetchone()
    conn.close()
    return jsonify(product)

if __name__ == '__main__':
    init_db()  # Run once to initialize DB
    app.run(debug=True)
