import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { Provider } from "react-redux";
import { configureStore } from "@reduxjs/toolkit";

import tasksReducer from "@/store/tasks/taskSlice";
import summaryReducer from "@/store/summary/summarySlice";
import { FilterBar } from "./FilterBar";

describe("FilterBar", () => {
  it("updates search after typing", async () => {
    const user = userEvent.setup();

    const store = configureStore({
      reducer: {
        tasks: tasksReducer,
        summary: summaryReducer,
      },
    });

    render(
      <Provider store={store}>
        <FilterBar />
      </Provider>,
    );

    const input = screen.getByPlaceholderText("Search tasks...");

    await user.type(input, "login");

    expect(input).toHaveValue("login");
  });
});
