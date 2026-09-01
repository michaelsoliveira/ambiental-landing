"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { CheckCircle2, Loader2, XCircle } from "lucide-react";
import { useSearchParams } from "next/navigation";
import { Suspense, useEffect, useState } from "react";
import { useForm } from "react-hook-form";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { servicosContato } from "@/lib/constants";
import { contatoSchema, type ContatoInput } from "@/lib/schemas";

type ServicoOption = { value: string; label: string };

type SubmitState = "idle" | "loading" | "success" | "error";

type ContactFormProps = {
  servicos?: ServicoOption[];
};

function ContactFormFields({ servicos = servicosContato }: ContactFormProps) {
  const searchParams = useSearchParams();
  const servicoPreSelecionado = searchParams.get("servico") ?? "";
  const [status, setStatus] = useState<SubmitState>("idle");

  const {
    register,
    handleSubmit,
    reset,
    setValue,
    formState: { errors },
  } = useForm<ContatoInput>({
    resolver: zodResolver(contatoSchema),
    defaultValues: {
      nome: "",
      empresa: "",
      email: "",
      telefone: "",
      servico: servicoPreSelecionado,
      mensagem: "",
    },
  });

  useEffect(() => {
    if (servicoPreSelecionado) {
      setValue("servico", servicoPreSelecionado);
    }
  }, [servicoPreSelecionado, setValue]);

  async function onSubmit(data: ContatoInput) {
    setStatus("loading");
    try {
      const response = await fetch("/api/contato", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      if (!response.ok) throw new Error("Falha no envio");

      setStatus("success");
      reset();
    } catch {
      setStatus("error");
    }
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4" noValidate>
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
        <div>
          <Label htmlFor="nome">Nome</Label>
          <Input id="nome" {...register("nome")} placeholder="Seu nome completo" />
          {errors.nome && (
            <p className="mt-1.5 text-small text-danger">{errors.nome.message}</p>
          )}
        </div>
        <div>
          <Label htmlFor="empresa">Empresa</Label>
          <Input id="empresa" {...register("empresa")} placeholder="Nome da empresa" />
          {errors.empresa && (
            <p className="mt-1.5 text-small text-danger">{errors.empresa.message}</p>
          )}
        </div>
      </div>

      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
        <div>
          <Label htmlFor="email">E-mail</Label>
          <Input id="email" type="email" {...register("email")} placeholder="voce@empresa.com" />
          {errors.email && (
            <p className="mt-1.5 text-small text-danger">{errors.email.message}</p>
          )}
        </div>
        <div>
          <Label htmlFor="telefone">Telefone</Label>
          <Input id="telefone" {...register("telefone")} placeholder="(00) 00000-0000" />
          {errors.telefone && (
            <p className="mt-1.5 text-small text-danger">{errors.telefone.message}</p>
          )}
        </div>
      </div>

      <div>
        <Label htmlFor="servico">Serviço de interesse</Label>
        <Select id="servico" {...register("servico")} defaultValue={servicoPreSelecionado}>
          <option value="">Selecione um serviço</option>
          {servicos.map((servico) => (
            <option key={servico.value} value={servico.value}>
              {servico.label}
            </option>
          ))}
        </Select>
        {errors.servico && (
          <p className="mt-1.5 text-small text-danger">{errors.servico.message}</p>
        )}
      </div>

      <div>
        <Label htmlFor="mensagem">Mensagem</Label>
        <Textarea
          id="mensagem"
          rows={4}
          {...register("mensagem")}
          placeholder="Conte um pouco sobre a necessidade da sua empresa"
        />
        {errors.mensagem && (
          <p className="mt-1.5 text-small text-danger">{errors.mensagem.message}</p>
        )}
      </div>

      <Button type="submit" variant="primary" className="w-full" disabled={status === "loading"}>
        {status === "loading" && <Loader2 className="h-4 w-4 animate-spin" strokeWidth={1.75} />}
        Enviar mensagem
      </Button>

      {status === "success" && (
        <div className="flex items-center gap-2 rounded-xl bg-primary-50 px-4 py-3 text-small font-medium text-primary-700">
          <CheckCircle2 className="h-5 w-5 shrink-0" strokeWidth={1.75} />
          Mensagem enviada. Nossa equipe entrará em contato em breve.
        </div>
      )}
      {status === "error" && (
        <div className="flex items-center gap-2 rounded-xl bg-red-50 px-4 py-3 text-small font-medium text-danger">
          <XCircle className="h-5 w-5 shrink-0" strokeWidth={1.75} />
          Não foi possível enviar sua mensagem. Tente novamente.
        </div>
      )}
    </form>
  );
}

export function ContactForm({ servicos }: ContactFormProps) {
  return (
    <Suspense fallback={<div className="h-96 animate-pulse rounded-2xl bg-neutral-50" />}>
      <ContactFormFields servicos={servicos} />
    </Suspense>
  );
}
