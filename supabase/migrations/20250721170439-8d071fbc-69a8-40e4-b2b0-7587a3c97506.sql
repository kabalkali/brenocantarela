-- Criar tabela de briefings
CREATE TABLE public.briefings (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  slug TEXT UNIQUE NOT NULL,
  description TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Criar tabela de perguntas
CREATE TABLE public.questions (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  briefing_id UUID NOT NULL,
  text TEXT NOT NULL,
  type TEXT NOT NULL CHECK (type IN ('SHORT_TEXT', 'LONG_TEXT', 'MULTIPLE_CHOICE', 'EMAIL', 'NUMBER')),
  options TEXT[],
  required BOOLEAN NOT NULL DEFAULT true,
  order_index INTEGER NOT NULL DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  FOREIGN KEY (briefing_id) REFERENCES public.briefings(id) ON DELETE CASCADE
);

-- Criar tabela de respostas
CREATE TABLE public.responses (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  briefing_id UUID NOT NULL,
  answers JSONB NOT NULL,
  respondent_email TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  FOREIGN KEY (briefing_id) REFERENCES public.briefings(id) ON DELETE CASCADE
);

-- Habilitar Row Level Security
ALTER TABLE public.briefings ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.questions ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.responses ENABLE ROW LEVEL SECURITY;

-- Políticas para briefings (públicos para leitura, admin para escrita)
CREATE POLICY "Anyone can view briefings" 
ON public.briefings 
FOR SELECT 
USING (true);

CREATE POLICY "Admin can create briefings" 
ON public.briefings 
FOR INSERT 
WITH CHECK (true);

CREATE POLICY "Admin can update briefings" 
ON public.briefings 
FOR UPDATE 
USING (true);

CREATE POLICY "Admin can delete briefings" 
ON public.briefings 
FOR DELETE 
USING (true);

-- Políticas para perguntas
CREATE POLICY "Anyone can view questions" 
ON public.questions 
FOR SELECT 
USING (true);

CREATE POLICY "Admin can manage questions" 
ON public.questions 
FOR ALL 
USING (true);

-- Políticas para respostas
CREATE POLICY "Anyone can create responses" 
ON public.responses 
FOR INSERT 
WITH CHECK (true);

CREATE POLICY "Admin can view all responses" 
ON public.responses 
FOR SELECT 
USING (true);

-- Função para atualizar timestamp
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Trigger para briefings
CREATE TRIGGER update_briefings_updated_at
  BEFORE UPDATE ON public.briefings
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();

-- Criar índices para performance
CREATE INDEX idx_questions_briefing_id ON public.questions(briefing_id);
CREATE INDEX idx_questions_order ON public.questions(briefing_id, order_index);
CREATE INDEX idx_responses_briefing_id ON public.responses(briefing_id);
CREATE INDEX idx_briefings_slug ON public.briefings(slug);