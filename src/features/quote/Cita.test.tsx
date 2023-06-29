import { rest } from "msw";
import { setupServer } from "msw/node";
import { screen, waitFor } from "@testing-library/react";
import {render} from "../../test-utils"
import {API_URL} from "../../app/constants"
import userEvent from "@testing-library/user-event";
import Cita from "./Cita";

const data = {
  results: [
    {quote:"Oh, so they have Internet on computers now!",
     character:"Homer Simpson",
     image:"https://cdn.glitch.com/3c3ffadc-3406-4440-bb95-d40ec8fcde72%2FHomerSimpson.png?1497567511939",
     characterDirection:"Right"}
  ],
};

export const handlers = [
  rest.get(API_URL, (req, res, ctx) => {
    const character = req.url.searchParams.get('character');
    if(!character) {
      return res(ctx.json([data]), ctx.delay(150));
    }
    return res(ctx.json(data), ctx.delay(150));
  }),
];

const server = setupServer(...handlers);

beforeAll(() => server.listen());

afterEach(() => server.resetHandlers());

afterAll(() => server.close());

describe("App", () => {

    describe("Cuando renderizamos el componente", () => {
      it("No deberia mostrar ninguna cita", async () => {
        render(<Cita/>);
        expect(screen.getByText(/No se encontro ninguna cita/i)).toBeInTheDocument();
        });
      it("No deberia mostrar ningun mensaje de cargando", async () => {
        await waitFor(() => {
          expect(screen.queryByText(/CARGANDO.../i)).not.toBeInTheDocument();
        });
      });
    });

    describe("Cuando se ingresa un personaje de Los Simpsons", () => {
      it("Deberia mostrar mensaje de cargando", async () => {
        render(<Cita/>);
            const user = userEvent.setup();
            const input = screen.getByRole("textbox", { name: "Author Cita" });
            const button = screen.getByRole("button", { name: "Obtener cita aleatoria"});
            await user.type(input, "Moe");
            await user.click(button);
          expect(screen.getByText(/CARGANDO.../i)).toBeInTheDocument();
        });
        it("Deberia mostrar la cita del personaje", async () => {
          render(<Cita/>);
          const user = userEvent.setup();
              const input = screen.getByRole("textbox", { name: "Author Cita" });
              const button = screen.getByRole("button", { name: "Obtener cita aleatoria"});
              await user.type(input, "Lisa");
              await user.click(button);
              const element = await screen.findByText(/Lisa/i);
              expect(element).toBeInTheDocument();
          });
      });

      describe("Cuando se ingresa un nombre inválido o números", () => {
        it("Deberia mostrar mensaje: Por favor ingrese un nombre válido", async () => {
          render(<Cita/>);
              const user = userEvent.setup();
              const input = screen.getByRole("textbox", { name: "Author Cita" });
              const button = screen.getByRole("button", { name: "Obtener cita aleatoria"});
              await user.type(input, "1234");
              await user.click(button);
              await waitFor(()=> {
                expect(
                screen.getByText(/No se encontro ninguna cita/i)).toBeInTheDocumnt();
              });
          });
        });
    });

    


