import { rest } from "msw";
import { setupServer } from "msw/node";
import { fireEvent, screen, waitFor } from "@testing-library/react";
import {render} from "../../test-utils"
import {API_URL} from "../../app/constants"
import userEvent from "@testing-library/user-event";
import Cita from "./Cita";

const data = 
  [
    {quote:"Oh, so they have Internet on computers now!",
     character:"Homer",
     image:"https://cdn.glitch.com/3c3ffadc-3406-4440-bb95-d40ec8fcde72%2FHomerSimpson.png?1497567511939",
     characterDirection:"Right"}
  ];

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
            await user.clear(input);
            await user.type(input, "Homer");
            await user.click(button);
            expect(screen.getByText(/CARGANDO.../i)).toBeInTheDocument();
        });
        it("Deberia mostrar la cita del personaje", async () => {
          render(<Cita/>);
          server.use(
            rest.get(`${API_URL}?character=Homer`, (req, res, ctx) => {
                return res(ctx.json(data), ctx.status(200));
            })
          );
          const user = userEvent.setup();
              const input = screen.getByRole("textbox", { name: "Author Cita" });
              const button = screen.getByRole("button", { name: "Obtener cita aleatoria"});
              await user.clear(input);
              await user.type(input, "Homer");
              await user.click(button);
              const element = await screen.findByText(/Homer/i);
              expect(element).toBeInTheDocument();
          });
      });

      describe("Cuando se ingresa un nombre inválido o números", () => {
        it("Deberia mostrar mensaje: Por favor ingrese un nombre válido", async () => {
          render(<Cita/>);
          server.use(
            rest.get(`${API_URL}?character=morty`, (req, res, ctx) => {
                return res(ctx.json([]), ctx.status(200));
            })
          );
              const user = userEvent.setup();
              const input = screen.getByRole("textbox", { name: "Author Cita" });
              const button = screen.getByRole("button", { name: "Obtener cita aleatoria"});
              await user.clear(input);
              await user.type(input, "morty");
              await user.click(button);
              await waitFor(()=>{
                expect(screen.getByText(/Por favor ingrese un nombre válido/i)).toBeInTheDocument();
              })
          });
          test("debería llamar a limpiar y restablecer el valor de entrada al hacer clic en el botón Borrar", () => {
            render(<Cita/>);
            const input = screen.getByPlaceholderText("Ingresa el nombre del autor");
            fireEvent.change(input, { target: { value: "Autor de la cita" } });
            const botonBorrar = screen.getByLabelText("Borrar");
            fireEvent.click(botonBorrar);
            expect((input as HTMLInputElement).value).toBe("");
          });
        });
      
    });

    
    

