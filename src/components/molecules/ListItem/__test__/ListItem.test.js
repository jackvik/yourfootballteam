import React from 'react';
import ListItem from "..";
import { fireEvent, render, screen } from "@testing-library/react";

describe("ListItem Component", () => {
  const mockPlayer = {
    country: "Chelsea FC",
    id: "171",
    isButton : true,
    name: "Kai Havertz",
    position: "MidFielder",
  };

  test("Renders player row", () => {
    render(<ListItem player={mockPlayer} 
        type={'ADD'}
        isButton={mockPlayer.isButton} />);

    const playerTeam = screen.getByText(/Chelsea FC/i);
    const playerName = screen.getByText(/Kai Havertz/i);
    const playerPosition = screen.getByText(/MID/i);

    expect(playerTeam).toBeInTheDocument();
    expect(playerPosition).toBeInTheDocument();
    expect(playerName).toBeInTheDocument();
  });

  test("Function clicked on ADD button click", () => {
    const MockHandler = jest.fn();

    render(
      <ListItem
        type="ADD"
        player={mockPlayer}
        onSelected={MockHandler}
        isButton={mockPlayer.isButton}
      />
    );

    fireEvent.click(screen.getByText("ADD"));
    expect(MockHandler).toHaveBeenCalled();
  });

  test("Function clicked on REMOVE button click", () => {
    const MockHandler = jest.fn();

    render(
      <ListItem
        type="REMOVE"
        player={mockPlayer}
        onSelected={MockHandler}
        isButton={mockPlayer.isButton}
      />
    );

    fireEvent.click(screen.getByText("REMOVE"));
    expect(MockHandler).toHaveBeenCalled();
  });
  test("Button not present if isButton prop is false", () => {
    render(
      <ListItem
        type="REMOVE"
        player={mockPlayer}
        isButton={false}
      />
    );
    const ButtonText = screen.queryByText("REMOVE");
    expect(ButtonText).not.toBeInTheDocument();
  });
});