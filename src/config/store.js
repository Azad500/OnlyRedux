import { configureStore } from "@reduxjs/toolkit"; //state konfiqure etmeye komek edecek
import counterSlice from "../counter/counterSlice";

export default configureStore({
  reducer: {
    counter: counterSlice, //her yere gonderile bilecek state var
  }, //qlobal stateleri ozunde saxlayacaq
});
