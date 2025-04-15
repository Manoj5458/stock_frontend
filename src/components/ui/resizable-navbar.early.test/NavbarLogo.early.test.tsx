import { NavbarLogo } from "../resizable-navbar";

// Import necessary modules and components
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";

// Import necessary modules and components
// Mock the cn function from utils
jest.mock("../../../lib/utils", () => {
  const actual = jest.requireActual("../../../lib/utils");
  return {
    ...actual,
    cn: jest.fn(),
  };
});

// Mock the motion/react components and hooks
jest.mock("motion/react", () => {
  const actual = jest.requireActual("motion/react");
  return {
    ...actual,
    motion: {
      ...actual.motion,
    },
    AnimatePresence: actual.AnimatePresence,
    useScroll: actual.useScroll,
    useMotionValueEvent: actual.useMotionValueEvent,
  };
});

// Test suite for NavbarLogo
describe("NavbarLogo() NavbarLogo method", () => {
  // Happy path tests
  describe("Happy Paths", () => {
    it("should render the logo image with correct src and alt attributes", () => {
      // Render the NavbarLogo component
      render(<NavbarLogo />);

      // Assert that the logo image is rendered with the correct attributes
      const logoImage = screen.getByRole("img", { name: /logo/i });
      expect(logoImage).toHaveAttribute(
        "src",
        "https://assets.aceternity.com/logo-dark.png"
      );
      expect(logoImage).toHaveAttribute("alt", "logo");
    });

    it('should render the text "Startup" with correct styling', () => {
      // Render the NavbarLogo component
      render(<NavbarLogo />);

      // Assert that the text "Startup" is rendered with the correct styling
      const logoText = screen.getByText(/Startup/i);
      expect(logoText).toBeInTheDocument();
      expect(logoText).toHaveClass("font-medium text-black dark:text-white");
    });

    it("should have a link that navigates to the homepage", () => {
      // Render the NavbarLogo component
      render(<NavbarLogo />);

      // Assert that the link navigates to the homepage
      const linkElement = screen.getByRole("link", { name: /Startup/i });
      expect(linkElement).toHaveAttribute("href", "/");
    });
  });

  // Edge case tests
  describe("Edge Cases", () => {
    it("should render without crashing when no props are provided", () => {
      // Render the NavbarLogo component
      render(<NavbarLogo />);

      // Assert that the component renders without crashing
      const logoElement = screen.getByRole("link", { name: /Startup/i });
      expect(logoElement).toBeInTheDocument();
    });
  });
});
