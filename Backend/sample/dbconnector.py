import mysql.connector

def establishDBConnection():
    try:
        connection = mysql.connector.connect(
            host='your_host',
            user='your_username',
            password='your_password',
            database='your_database'
        )
        
        if connection.is_connected():
            print("Connected to MySQL database")

    
    except mysql.connector.Error as e:
        print("Error connecting to MySQL database:", e)



def check_credentials(email, password):
    # Connect to MySQL database
    try:
        connection = mysql.connector.connect(
            host='your_host',
            user='your_username',
            password='your_password',
            database='your_database'
        )
        
        if connection.is_connected():
            print("Connected to MySQL database")

            # Create cursor object
            cursor = connection.cursor()

            # Execute SQL query to check email and password
            query = "SELECT * FROM users WHERE email = %s AND password = %s"
            cursor.execute(query, (email, password))
            result = cursor.fetchone()

            if result:
                print("Login successful!")
            else:
                print("Invalid email or password")

            # Close cursor and connection
            cursor.close()
            connection.close()

    except mysql.connector.Error as e:
        print("Error connecting to MySQL database:", e)

# Example usage
email = "example@example.com"
password = "password123"
check_credentials(email, password)
