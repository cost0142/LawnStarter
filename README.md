✅ STEP 1: Finalize the Backend
Goal: Ensure the backend is working and saving metrics in MySQL.

✔️ 1.1. Create docker-compose.yml at the project root
This will spin up Node.js, MySQL, and optionally the frontend.

✔️ 1.2. Create the SQL schema (metrics table)
Save it as schema.sql to run automatically.

✔️ 1.3. Test the /api/metrics route via Postman or curl

✅ STEP 2: Create the React Frontend
Goal: Build the UI with search functionality for SWAPI and metric submission.

✔️ 2.1. Create a form to search for people on SWAPI
✔️ 2.2. Display results (name + view details button)
✔️ 2.3. Send metric_type and metric_data to the backend

✅ STEP 3: Dockerize Everything
Goal: Run everything with a single command.

✔️ 3.1. Create a Dockerfile inside Frontend/
✔️ 3.2. Test with docker-compose up --build and verify access

✅ STEP 4: Statistics (Queue and Events every 5 min)
Goal: Endpoint that returns reprocessed statistics.





Backend ->
1) brew install colima

Inicie o Colima (com suporte a Docker):
1.1) colima start

Se estiver usando arquitetura x86_64, especifique:
1.2) colima start --arch x86_64 --memory 4

2) docker-compose up --build

Front -> npm start