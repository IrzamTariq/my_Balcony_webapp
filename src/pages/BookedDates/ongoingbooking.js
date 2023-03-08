import React from "react";
import { Divider, Button } from "@mui/material";
import GroupIcon from "@mui/icons-material/Group";
import { Grid, Box, Typography, Rating } from "@mui/material";
import { Card, CardContent } from "@mui/material";

export default function ongoingbooking() {
  return (
    <>
      <Typography sx={{ fontSize: 34, mt: 3 }}>ongoing booking</Typography>
      <Grid
        container
        sx={{
          display: "flex",
          justifyContent: "space-around",
          rowGap: 2,
          mt: 4,
        }}
      >
        {[1, 2].map(() => {
          return (
            <Card
              sx={{
                width: 350,
                height: 155,
                backgroundColor: "#faf9f6",
                borderRadius: 3,
              }}
            >
              <CardContent
                sx={{
                  display: "flex",
                  gap: 2,
                }}
              >
                <Box
                  sx={{
                    width: 141,
                    height: 120,
                    backgroundColor: "#000000",
                    borderRadius: 6,
                  }}
                ></Box>
                <Box
                  sx={{
                    flex: 1,
                  }}
                >
                  <Typography
                    sx={{
                      fontSize: 12,
                      fontWeight: "bold",
                      marginBottom: 1,
                    }}
                    color="#000"
                    gutterBottom
                  >
                    Bushwick Lofts
                  </Typography>
                  <Typography
                    sx={{
                      fontSize: 9,
                    }}
                    color="#000"
                    gutterBottom
                  >
                    Date of Workspace Check-in: 02/15/21, 02/16/21, 02/22/21,
                    02/25/21...
                  </Typography>
                  <Typography
                    sx={{
                      fontSize: 9,
                    }}
                    color="#000"
                    gutterBottom
                  >
                    Time Frame of Service: 8 AM - 5 PM EST
                  </Typography>
                  <Typography
                    sx={{
                      fontSize: 8,
                    }}
                    color="#000"
                    gutterBottom
                  >
                    Total Number of People: 5
                  </Typography>
                  <Typography
                    sx={{
                      fontSize: 14,
                    }}
                    color="#000"
                    gutterBottom
                  >
                    Total: $179.20
                  </Typography>
                </Box>
              </CardContent>
            </Card>
          );
        })}
      </Grid>
    </>
  );
}
