from src import create_server

server = create_server()
server.run(port=4000, host='localhost', debug=True)
