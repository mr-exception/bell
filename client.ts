import io from "socket.io-client";

const connection = io.connect("ws://localhost:5003", {
  transports: ["websocket"],
  query: {
    // application: "sparow",
    // token:
    //   "Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJhdWQiOiI5MjQ2MjYyNC1iZDVkLTQ4YjItODgxMS05MWUwNjMxMWJlOGMiLCJqdGkiOiJlOWVmZjY1MDMwZmFkMjY0NWRjNjJiYjFmNzEyNDlhODBmYjc4Y2NjN2YxODQxNTIzOGFhMjg3Njg3NDc0MzUzNzcxNjkxODEwY2MyMTA5MiIsImlhdCI6IjE2MDgzOTEzOTIuMTUzNTUxIiwibmJmIjoiMTYwODM5MTM5Mi4xNTM1NjkiLCJleHAiOiIxNjM5OTI3MzkyLjEzNTI4NSIsInN1YiI6IjM2YmJmNGViLWIzMTktNDJkNy1iOWJhLThiMzhlOTMxMGFjZCIsInNjb3BlcyI6W119.3R0WH9Y_zLJYHNCesbnJvTlBYm__IO8BrS6i51rtxjYKUeuqgEpirMb1ea5615sG9lHEgCF1mCf3ZEFD3yuE6t9sclS2TU9GEgc3moeVTZJy1o5SOKGS9QJyAegwJpHbMwqnJI78EfKx8UreVvz_rN-LFmspXfbWX8K5pGfvEB48RxRheuu90CbVgBkdSE4hT72kyoAvJyd_oecROT69q_YWAzSEl8NybzdwPxeeYsj1TdUoyPaoLJm0s-tyAlSNS02NotZYOq4CBef4xxzH9048muUmDGSOkYKECmugzPPtA4sJS3r6fTEcd9Bco_lVsGl1QaJOdBKVtAegcu14rU-6AGyl9bdqBqRld10Hx2Hg5xA89PU0iENqs7rhIjbtM-0OOIV55V-rkLjjvyNpFzHC3I6AmoN-8V_7LzciUuFyN02Cz4LJhroG9AUCKQXZ6poKykS0ptVSoowOxCTXxP__C_3xOxwuU--ZZWMPO2bluhi4pLWx1NJFmnxWuA75gnocmvWHyLLS74TMBoR6m-dV4VqxT5rxOVYQiIhm-NdmwQOw2hJ_CSUmXMUo2LPJJ468mcMoiJ0-J8OucjCUgDW73VQJnHY0T_BKO6X61FHdURy3ZunNrd4Sbm4BLojzGvJPI0JrNmqyLBUvmUx2leRBpbeRUeHpkNI2pn8VvUw",
  },
});
console.log("start");
connection.emit(
  "join",
  {
    application: "sparow",
    auth_token:
      "eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJhdWQiOiI5MjU0OTgyNi0zNzhmLTQ1NmUtYjI2NC0xYTMxMjYwNDk3NTgiLCJqdGkiOiJkMzc2YWU4ZmUzYmRkZmM3MDdkNDJmZGU5NTM0OWQ2MmRmMGFiYzFhZWQyYTE3OGM5OWEwNTlmMTlhMGIyMTAwYThiMDM5NmNjODkwZjlkZCIsImlhdCI6IjE2MDg5MjA2MjYuMjkwNjIxIiwibmJmIjoiMTYwODkyMDYyNi4yOTA2MzciLCJleHAiOiIxNjQwNDU2NjI2LjI1NDgyNCIsInN1YiI6IjA3Y2E1YTE1LTYzMGMtNDAyNS1iOGRlLWQxYWFhNzAzNjExYSIsInNjb3BlcyI6W119.A3So_v2qrejNDbbzN4zWYyu3E6V-m90duzLVFaMmU2loKHwzh55p94l84HFGmCj1tI0NpupPj30Faoh6x4hBrzq3_j1Kmd4gBLEWGrCKTjxJAKsj4LLVzZjXDqPQzcOqt23GXkO3f2WiZMOwEwp4_FOLPy7AM5u-R3FWV7OOKd6NB5gubOeeVXvRlUQAWkQFbGNDlBOv7Cs4Osv-JMfL7HOlrwFVLqZpWiAo8X_7NOopfAyHovh4NhjG5RMn3wScDn0sKjUj-sh8vW6D4hdk-eUVTJK2vSU1QjMM8RXGgd1E54rq1WJeLYZBdf-y45v70JNHMTe8dJuGjUXaq7DJpMxFD25CchLzidL7KUQqKQ5SB9Emf8buz5WLowDpBnOMy6Rceux-b5KKrjeu09l16nGKiZwpCkXdGX1dFkGU0zhD8qJmKoDkiOyMDnJkoAsgr4pXYACzKLcyscF5G7ASdOzZ9D4N6a6YfPRb3d9RbAdQjd4PmmbJh3nTkxIgMZMCoGAxwk3PIssITM5uwLJk-NtCaWfJ6MyPqKD3q3LNNPj-qzqYXq6WyeZocR89dbGaxf5osqny_fxM_P0OI5_Owh25OSxCj4xNHm0WvCh0p3xwQBm8tnrZBNkfkO0v-vl9xZFOAMeF7i75L8VllTksk9PnJycEbxeJYQNcYH2NKS8",
    channel: "profile:07ca5a15-630c-4025-b8de-d1aaa703611a",
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
