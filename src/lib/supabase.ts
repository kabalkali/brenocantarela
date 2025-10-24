import { supabase } from '@/integrations/supabase/client';
import { BriefingWithQuestions, CreateBriefingData, AnswerData, Response, Question } from '@/types/briefing';

// Função para gerar slug único
export const generateSlug = (title: string): string => {
  const baseSlug = title
    .toLowerCase()
    .replace(/[^a-z0-9\s]/g, '')
    .replace(/\s+/g, '-')
    .substring(0, 30);
  
  const randomId = Math.random().toString(36).substring(2, 8);
  return `${baseSlug}-${randomId}`;
};

// Criar briefing
export const createBriefing = async (data: CreateBriefingData) => {
  const slug = generateSlug(data.title);

  // Criar o briefing
  const { data: briefing, error: briefingError } = await supabase
    .from('briefings')
    .insert({
      title: data.title,
      description: data.description,
      slug,
    })
    .select()
    .single();

  if (briefingError) throw briefingError;

  // Criar as perguntas
  const questions = data.questions.map((q, index) => ({
    briefing_id: briefing.id,
    text: q.text,
    type: q.type,
    options: q.options,
    required: q.required,
    order_index: index,
  }));

  const { error: questionsError } = await supabase
    .from('questions')
    .insert(questions);

  if (questionsError) throw questionsError;

  return briefing;
};

// Buscar briefing por slug com perguntas
export const getBriefingBySlug = async (slug: string): Promise<BriefingWithQuestions | null> => {
  const { data: briefing, error: briefingError } = await supabase
    .from('briefings')
    .select('*')
    .eq('slug', slug)
    .single();

  if (briefingError || !briefing) return null;

  const { data: questions, error: questionsError } = await supabase
    .from('questions')
    .select('*')
    .eq('briefing_id', briefing.id)
    .order('order_index');

  if (questionsError) throw questionsError;

  return {
    ...briefing,
    questions: (questions || []) as Question[],
  };
};

// Listar todos os briefings
export const getAllBriefings = async () => {
  const { data, error } = await supabase
    .from('briefings')
    .select('*')
    .order('created_at', { ascending: false });

  if (error) throw error;
  return data;
};

// Enviar resposta
export const submitResponse = async (briefingId: string, data: AnswerData) => {
  const { error } = await supabase
    .from('responses')
    .insert({
      briefing_id: briefingId,
      answers: data.answers,
      respondent_email: data.respondent_email,
    });

  if (error) throw error;
};

// Buscar respostas de um briefing
export const getBriefingResponses = async (briefingId: string): Promise<Response[]> => {
  const { data, error } = await supabase
    .from('responses')
    .select('*')
    .eq('briefing_id', briefingId)
    .order('created_at', { ascending: false });

  if (error) throw error;
  return (data || []) as Response[];
};

// Deletar briefing
export const deleteBriefing = async (id: string) => {
  const { error } = await supabase
    .from('briefings')
    .delete()
    .eq('id', id);

  if (error) throw error;
};