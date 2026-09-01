import { z } from "zod";

export const contatoSchema = z.object({
  nome: z.string().min(2, "Informe seu nome completo"),
  empresa: z.string().min(2, "Informe o nome da empresa"),
  email: z.string().email("Informe um e-mail válido"),
  telefone: z.string().min(8, "Informe um telefone válido"),
  servico: z.string().min(1, "Selecione um serviço de interesse"),
  mensagem: z.string().min(10, "Conte um pouco mais sobre sua necessidade"),
});

export type ContatoInput = z.infer<typeof contatoSchema>;
