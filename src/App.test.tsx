import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import App from "./App";
import * as api from "./api";

jest.mock("./api");

describe("AI Application", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test("submits a valid text input and language selection", async () => {
    (api.writeContent as jest.Mock).mockResolvedValueOnce({
      data: "content-id",
    });
    (api.getContent as jest.Mock).mockResolvedValueOnce({
      data: {
        summaries: [{ result: "Summary text", status: "ready" }],
        insights: [{ result: "Insights text", status: "ready" }],
        quotes: [{ result: "Quotes text", status: "ready" }],
      },
    });

    render(
      <MemoryRouter>
        <App />
      </MemoryRouter>
    );

    fireEvent.change(
      screen.getByPlaceholderText(
        "Paste transcripts, articles and other text here"
      ),
      {
        target: { value: "Sample text" },
      }
    );

    fireEvent.click(screen.getByText("Upload"));

    await waitFor(() => {
      expect(
        screen.getByRole("button", { name: "Summary" })
      ).toBeInTheDocument();
    });

    await waitFor(() => {
      expect(
        screen.getByRole("button", { name: "Quotes" })
      ).toBeInTheDocument();
    });

    await waitFor(() => {
      expect(
        screen.getByRole("button", { name: "Insights" })
      ).toBeInTheDocument();
    });

    await waitFor(() => {
      expect(screen.getByText("Summary text")).toBeInTheDocument();
    });
  });

  test("submits an empty text input", async () => {
    render(
      <MemoryRouter>
        <App />
      </MemoryRouter>
    );

    fireEvent.click(screen.getByText("Upload"));

    expect(
      await screen.findByText("Paste your text to transform it")
    ).toBeInTheDocument();
  });

  test("changes the selected language", () => {
    render(
      <MemoryRouter>
        <App />
      </MemoryRouter>
    );

    fireEvent.click(screen.getByText("English"));
    fireEvent.click(screen.getByText("Spanish"));

    expect(screen.getByText("Spanish")).toBeInTheDocument();
  });

  test("navigates back to the input page", async () => {
    (api.writeContent as jest.Mock).mockResolvedValueOnce({
      data: "content-id",
    });
    (api.getContent as jest.Mock).mockResolvedValueOnce({
      data: {
        summaries: [{ result: "Summary text", status: "ready" }],
        insights: [{ result: "Insights text", status: "ready" }],
        quotes: [{ result: "Quotes text", status: "ready" }],
      },
    });

    render(
      <MemoryRouter>
        <App />
      </MemoryRouter>
    );

    fireEvent.change(
      screen.getByPlaceholderText(
        "Paste transcripts, articles and other text here"
      ),
      {
        target: { value: "Sample text" },
      }
    );
    fireEvent.click(screen.getByText("Upload"));

    await waitFor(() => {
      expect(
        screen.getByRole("button", { name: "Summary" })
      ).toBeInTheDocument();
    });

    fireEvent.click(screen.getByTestId("back-button"));

    expect(screen.getByText("Upload Source Material")).toBeInTheDocument();
  });

  test("handles error for failed API request", async () => {
    const alertMock = jest.spyOn(window, "alert").mockImplementation(() => {});

    (api.writeContent as jest.Mock).mockRejectedValueOnce(
      new Error("API error")
    );

    render(
      <MemoryRouter>
        <App />
      </MemoryRouter>
    );

    fireEvent.change(
      screen.getByPlaceholderText(
        "Paste transcripts, articles and other text here"
      ),
      {
        target: { value: "Sample text" },
      }
    );
    fireEvent.click(screen.getByText("Upload"));

    await waitFor(() => {
      expect(alertMock).toHaveBeenCalledTimes(1);
    });

    alertMock.mockRestore();
  });

  test("switches between summary and insights tabs", async () => {
    (api.writeContent as jest.Mock).mockResolvedValueOnce({
      data: "content-id",
    });
    (api.getContent as jest.Mock).mockResolvedValueOnce({
      data: {
        summaries: [{ result: "Summary text", status: "ready" }],
        insights: [{ result: "Insights text", status: "ready" }],
        quotes: [{ result: "Quotes text", status: "ready" }],
      },
    });

    render(
      <MemoryRouter>
        <App />
      </MemoryRouter>
    );

    fireEvent.change(
      screen.getByPlaceholderText(
        "Paste transcripts, articles and other text here"
      ),
      {
        target: { value: "Sample text" },
      }
    );
    fireEvent.click(screen.getByText("Upload"));

    await waitFor(() => {
      expect(screen.getByText("Summary text")).toBeInTheDocument();
    });

    fireEvent.click(screen.getByText("Insights"));

    expect(screen.getByText("Insights text")).toBeInTheDocument();
  });
});
