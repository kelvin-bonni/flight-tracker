# flight-tracker

# Pre-requisites
- Docker - `https://docs.docker.com/engine/install/`

## Start up
1. Start docker
2. Clone this repo
3. Navigate to the directory of this repo
4. Run `docker-compose up`
5. The API can be accessed on `http://localhost:8080/calculate`

Example cURL command:
curl -X POST http://localhost:8080/calculate \
  -H "Content-Type: application/json" \
  -d '{
    "origin": "SFO",
    "destination": "EWR",
    "flights": [
      ["ATL", "EWR"],
      ["SFO", "ATL"]
    ]
  }'