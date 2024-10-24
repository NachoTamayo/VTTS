import { render, screen, fireEvent } from "@testing-library/react";
import { useParams } from "next/navigation";
import LocaleSwitcherSelect from "@/components/language/LocaleSwitcherSelect";
import { ChangeEvent, ReactNode, useTransition, useState } from "react";
import { Locale, usePathname, useRouter } from "@/routing";

// Mockear el enrutador de Next.js
jest.mock("@/routing", () => ({
  useRouter: jest.fn(),
  usePathname: jest.fn(),
  useParams: jest.fn(),
}));

// En la parte superior de tu archivo de pruebas
jest.mock("next/navigation", () => ({
  useParams: jest.fn(),
  useRouter: jest.fn(),
  usePathname: jest.fn(),
}));

describe("LocaleSwitcherSelect", () => {
  let replaceMock: jest.Mock;

  beforeEach(() => {
    // Resetea los mocks antes de cada test
    replaceMock = jest.fn();
    (useRouter as jest.Mock).mockReturnValue({ replace: replaceMock });
    (usePathname as jest.Mock).mockReturnValue("/current-path");
    (useParams as jest.Mock).mockReturnValue({});
  });

  it("debe mostrar la bandera de UK si el idioma es 'en'", () => {
    render(<LocaleSwitcherSelect defaultValue="en" />);

    const imgElement = screen.getByAltText("UK Flag");
    expect(imgElement).toBeInTheDocument(); // Verifica que la bandera de UK está visible
  });

  it("debe cambiar el idioma de 'en' a 'es' cuando se hace clic en la bandera", () => {
    render(<LocaleSwitcherSelect defaultValue="en" />);

    const imgElement = screen.getByAltText("UK Flag");
    fireEvent.click(imgElement); // Simula el clic en la bandera

    expect(replaceMock).toHaveBeenCalledWith({ pathname: "/current-path", params: {} }, { locale: "es" });

    // Verifica que ahora se muestra la bandera de España
    const newImgElement = screen.getByAltText("ES Flag");
    expect(newImgElement).toBeInTheDocument();
  });

  it("debe cambiar el idioma de 'es' a 'en' cuando se hace clic en la bandera", () => {
    render(<LocaleSwitcherSelect defaultValue="es" />);

    const imgElement = screen.getByAltText("ES Flag");
    fireEvent.click(imgElement); // Simula el clic en la bandera de España

    expect(replaceMock).toHaveBeenCalledWith({ pathname: "/current-path", params: {} }, { locale: "en" });

    // Verifica que ahora se muestra la bandera de UK
    const newImgElement = screen.getByAltText("UK Flag");
    expect(newImgElement).toBeInTheDocument();
  });
});
