import io from "socket.io-client";

const connection = io.connect("ws://localhost:5003", {
  transports: ["websocket"],
  query: {
    // application: "sparow",
    // token:
    //   "Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJhdWQiOiI5MjQ2MjYyNC1iZDVkLTQ4YjItODgxMS05MWUwNjMxMWJlOGMiLCJqdGkiOiJlOWVmZjY1MDMwZmFkMjY0NWRjNjJiYjFmNzEyNDlhODBmYjc4Y2NjN2YxODQxNTIzOGFhMjg3Njg3NDc0MzUzNzcxNjkxODEwY2MyMTA5MiIsImlhdCI6IjE2MDgzOTEzOTIuMTUzNTUxIiwibmJmIjoiMTYwODM5MTM5Mi4xNTM1NjkiLCJleHAiOiIxNjM5OTI3MzkyLjEzNTI4NSIsInN1YiI6IjM2YmJmNGViLWIzMTktNDJkNy1iOWJhLThiMzhlOTMxMGFjZCIsInNjb3BlcyI6W119.3R0WH9Y_zLJYHNCesbnJvTlBYm__IO8BrS6i51rtxjYKUeuqgEpirMb1ea5615sG9lHEgCF1mCf3ZEFD3yuE6t9sclS2TU9GEgc3moeVTZJy1o5SOKGS9QJyAegwJpHbMwqnJI78EfKx8UreVvz_rN-LFmspXfbWX8K5pGfvEB48RxRheuu90CbVgBkdSE4hT72kyoAvJyd_oecROT69q_YWAzSEl8NybzdwPxeeYsj1TdUoyPaoLJm0s-tyAlSNS02NotZYOq4CBef4xxzH9048muUmDGSOkYKECmugzPPtA4sJS3r6fTEcd9Bco_lVsGl1QaJOdBKVtAegcu14rU-6AGyl9bdqBqRld10Hx2Hg5xA89PU0iENqs7rhIjbtM-0OOIV55V-rkLjjvyNpFzHC3I6AmoN-8V_7LzciUuFyN02Cz4LJhroG9AUCKQXZ6poKykS0ptVSoowOxCTXxP__C_3xOxwuU--ZZWMPO2bluhi4pLWx1NJFmnxWuA75gnocmvWHyLLS74TMBoR6m-dV4VqxT5rxOVYQiIhm-NdmwQOw2hJ_CSUmXMUo2LPJJ468mcMoiJ0-J8OucjCUgDW73VQJnHY0T_BKO6X61FHdURy3ZunNrd4Sbm4BLojzGvJPI0JrNmqyLBUvmUx2leRBpbeRUeHpkNI2pn8VvUw",
  },
});
connection.emit(
  "join",
  {
    application: "sparow",
    auth_token:
      "eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJhdWQiOiI5MjQ2MjYyNC1iZDVkLTQ4YjItODgxMS05MWUwNjMxMWJlOGMiLCJqdGkiOiJlOWVmZjY1MDMwZmFkMjY0NWRjNjJiYjFmNzEyNDlhODBmYjc4Y2NjN2YxODQxNTIzOGFhMjg3Njg3NDc0MzUzNzcxNjkxODEwY2MyMTA5MiIsImlhdCI6IjE2MDgzOTEzOTIuMTUzNTUxIiwibmJmIjoiMTYwODM5MTM5Mi4xNTM1NjkiLCJleHAiOiIxNjM5OTI3MzkyLjEzNTI4NSIsInN1YiI6IjM2YmJmNGViLWIzMTktNDJkNy1iOWJhLThiMzhlOTMxMGFjZCIsInNjb3BlcyI6W119.3R0WH9Y_zLJYHNCesbnJvTlBYm__IO8BrS6i51rtxjYKUeuqgEpirMb1ea5615sG9lHEgCF1mCf3ZEFD3yuE6t9sclS2TU9GEgc3moeVTZJy1o5SOKGS9QJyAegwJpHbMwqnJI78EfKx8UreVvz_rN-LFmspXfbWX8K5pGfvEB48RxRheuu90CbVgBkdSE4hT72kyoAvJyd_oecROT69q_YWAzSEl8NybzdwPxeeYsj1TdUoyPaoLJm0s-tyAlSNS02NotZYOq4CBef4xxzH9048muUmDGSOkYKECmugzPPtA4sJS3r6fTEcd9Bco_lVsGl1QaJOdBKVtAegcu14rU-6AGyl9bdqBqRld10Hx2Hg5xA89PU0iENqs7rhIjbtM-0OOIV55V-rkLjjvyNpFzHC3I6AmoN-8V_7LzciUuFyN02Cz4LJhroG9AUCKQXZ6poKykS0ptVSoowOxCTXxP__C_3xOxwuU--ZZWMPO2bluhi4pLWx1NJFmnxWuA75gnocmvWHyLLS74TMBoR6m-dV4VqxT5rxOVYQiIhm-NdmwQOw2hJ_CSUmXMUo2LPJJ468mcMoiJ0-J8OucjCUgDW73VQJnHY0T_BKO6X61FHdURy3ZunNrd4Sbm4BLojzGvJPI0JrNmqyLBUvmUx2leRBpbeRUeHpkNI2pn8VvUw",
    channel: "project.3",
  },
  (response: { ok: boolean }) => {
    if (response.ok) {
      connection.on("profile_update", (data: any) => {
        console.log(data);
      });
    } else {
      console.log(response);
    }
  }
);
connection.on("sparow/project3", (data: any) => {
  console.log(data);
});
