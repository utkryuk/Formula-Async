[
  {
    $match: {
      "year": 2021
    }
  },
  {
    $addFields: {
      "races": {
        $map: {
          input: "$races",
          as: "racer",
          in: {
            "round": "$$racer.round",
            "race_id": "$$racer.race_id",
            "racers": {
              $filter: {
                input: "$$racer.racers",
                as: "racer",
                cond: {
                  $in: [
                    "$$racer.driverId",
                    ["hamilton", "max_verstappen"]
                  ]
                }
              }
            }
          }
        }
      }
    }
  }
]