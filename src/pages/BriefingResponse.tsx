import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';
import { GradientCard } from '@/components/ui/gradient-card';
import { ThemeToggle } from '@/components/ThemeToggle';
import { useToast } from '@/hooks/use-toast';
import { getBriefingBySlug, submitResponse } from '@/lib/supabase';
import { BriefingWithQuestions, Question } from '@/types/briefing';
import { CheckCircle, FileText, Clock, User } from 'lucide-react';

const BriefingResponse = () => {
  const { slug } = useParams<{ slug: string }>();
  const [briefing, setBriefing] = useState<BriefingWithQuestions | null>(null);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const { toast } = useToast();

  // Criar schema dinâmico baseado nas perguntas
  const createValidationSchema = (questions: Question[]) => {
    const schemaFields: Record<string, any> = {};
    
    questions.forEach((question) => {
      if (question.required) {
        switch (question.type) {
          case 'EMAIL':
            schemaFields[question.id] = z.string().email('E-mail inválido');
            break;
          case 'NUMBER':
            schemaFields[question.id] = z.string().regex(/^\d+$/, 'Deve ser um número');
            break;
          case 'MULTIPLE_CHOICE':
            schemaFields[question.id] = z.array(z.string()).min(1, 'Selecione pelo menos uma opção');
            break;
          default:
            schemaFields[question.id] = z.string().min(1, 'Este campo é obrigatório');
        }
      } else {
        switch (question.type) {
          case 'EMAIL':
            schemaFields[question.id] = z.union([z.string().email(), z.literal('')]);
            break;
          case 'MULTIPLE_CHOICE':
            schemaFields[question.id] = z.array(z.string()).optional();
            break;
          default:
            schemaFields[question.id] = z.string().optional();
        }
      }
    });

    // Campo opcional para e-mail do respondente
    schemaFields['respondent_email'] = z.union([z.string().email(), z.literal('')]);

    return z.object(schemaFields);
  };

  const form = useForm({
    resolver: briefing ? zodResolver(createValidationSchema(briefing.questions)) : undefined,
  });

  useEffect(() => {
    if (!slug) return;

    const loadBriefing = async () => {
      try {
        const data = await getBriefingBySlug(slug);
        if (!data) {
          toast({
            title: "Briefing não encontrado",
            description: "O link que você está tentando acessar não existe ou foi removido.",
            variant: "destructive",
          });
          return;
        }
        setBriefing(data);
      } catch (error) {
        toast({
          title: "Erro",
          description: "Não foi possível carregar o briefing",
          variant: "destructive",
        });
      } finally {
        setLoading(false);
      }
    };

    loadBriefing();
  }, [slug, toast]);

  const onSubmit = async (data: any) => {
    if (!briefing) return;

    setSubmitting(true);
    try {
      const { respondent_email, ...answers } = data;
      
      await submitResponse(briefing.id, {
        answers,
        respondent_email: respondent_email || undefined,
      });

      setSubmitted(true);
      toast({
        title: "Sucesso!",
        description: "Suas respostas foram enviadas com sucesso",
      });
    } catch (error) {
      toast({
        title: "Erro",
        description: "Não foi possível enviar suas respostas. Tente novamente.",
        variant: "destructive",
      });
    } finally {
      setSubmitting(false);
    }
  };

  const renderQuestionInput = (question: Question) => {
    switch (question.type) {
      case 'SHORT_TEXT':
        return (
          <Input
            {...form.register(question.id)}
            placeholder="Digite sua resposta..."
          />
        );

      case 'LONG_TEXT':
        return (
          <Textarea
            {...form.register(question.id)}
            placeholder="Digite sua resposta..."
            rows={4}
          />
        );

      case 'EMAIL':
        return (
          <Input
            {...form.register(question.id)}
            type="email"
            placeholder="seu@email.com"
          />
        );

      case 'NUMBER':
        return (
          <Input
            {...form.register(question.id)}
            type="number"
            placeholder="Digite um número..."
          />
        );

      case 'MULTIPLE_CHOICE':
        return (
          <div className="space-y-3">
            {question.options?.map((option, index) => (
              <div key={index} className="flex items-center space-x-2">
                <Controller
                  name={question.id}
                  control={form.control}
                  render={({ field }) => (
                    <Checkbox
                      checked={Array.isArray(field.value) && field.value.includes(option)}
                      onCheckedChange={(checked) => {
                        const currentValue = Array.isArray(field.value) ? field.value : [];
                        if (checked) {
                          field.onChange([...currentValue, option]);
                        } else {
                          field.onChange(currentValue.filter((v: string) => v !== option));
                        }
                      }}
                    />
                  )}
                />
                <Label>{option}</Label>
              </div>
            ))}
          </div>
        );

      default:
        return null;
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-background via-background/80 to-muted/30 flex items-center justify-center">
        <div className="absolute top-4 right-4">
          <ThemeToggle />
        </div>
        <div className="text-center">
          <div className="relative">
            <div className="absolute inset-0 bg-gradient-to-r from-primary/20 to-secondary/20 rounded-full blur-lg opacity-50"></div>
            <div className="relative animate-spin rounded-full h-16 w-16 border-4 border-primary/20 border-t-primary mx-auto mb-6"></div>
          </div>
          <p className="text-muted-foreground text-lg">Carregando briefing...</p>
        </div>
      </div>
    );
  }

  if (!briefing) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-background via-background/80 to-muted/30 flex items-center justify-center p-4">
        <div className="absolute top-4 right-4">
          <ThemeToggle />
        </div>
        <GradientCard variant="subtle" className="max-w-md text-center">
          <FileText className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
          <h2 className="text-xl font-semibold mb-2">Briefing não encontrado</h2>
          <p className="text-muted-foreground">
            O link que você está tentando acessar não existe ou foi removido.
          </p>
        </GradientCard>
      </div>
    );
  }

  if (submitted) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-background via-background/80 to-muted/30 flex items-center justify-center p-4">
        <div className="absolute top-4 right-4">
          <ThemeToggle />
        </div>
        <GradientCard variant="hero" className="max-w-md text-center">
          <div className="relative">
            <div className="absolute -inset-4 bg-gradient-to-r from-primary/20 to-secondary/20 rounded-full blur-xl opacity-60"></div>
            <CheckCircle className="relative h-20 w-20 text-primary mx-auto mb-6 animate-scale-in" />
          </div>
          <h2 className="text-3xl font-bold mb-3 bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
            Resposta Enviada!
          </h2>
          <p className="text-muted-foreground text-lg leading-relaxed mb-6">
            Obrigado por preencher o briefing. Suas respostas foram registradas com sucesso.
          </p>
          <div className="p-4 bg-primary/10 rounded-lg border border-primary/20">
            <p className="text-sm text-primary">
              ✓ Respostas salvas com segurança
            </p>
          </div>
        </GradientCard>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background/80 to-muted/30 py-8">
      <div className="absolute top-4 right-4">
        <ThemeToggle />
      </div>
      
      <div className="container mx-auto px-4 max-w-3xl">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-primary/20 to-secondary/20 rounded-2xl mb-4">
            <FileText className="h-8 w-8 text-primary" />
          </div>
          <h1 className="text-4xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent mb-3">
            {briefing.title}
          </h1>
          {briefing.description && (
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto mb-6">
              {briefing.description}
            </p>
          )}
          
          <div className="flex items-center justify-center space-x-6 text-sm text-muted-foreground">
            <div className="flex items-center space-x-2">
              <FileText className="h-4 w-4" />
              <span>{briefing.questions.length} perguntas</span>
            </div>
            <div className="flex items-center space-x-2">
              <Clock className="h-4 w-4" />
              <span>~{Math.ceil(briefing.questions.length * 1.5)} min</span>
            </div>
          </div>
        </div>

        {/* Form */}
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          {/* Perguntas */}
          {briefing.questions.map((question, index) => (
            <GradientCard key={question.id} variant="default">
              <div className="space-y-4">
                <div>
                  <Label className="text-base font-medium">
                    {index + 1}. {question.text}
                    {question.required && <span className="text-destructive ml-1">*</span>}
                  </Label>
                </div>

                <div>
                  {renderQuestionInput(question)}
                  {form.formState.errors[question.id] && (
                    <p className="text-destructive text-sm mt-1">
                      {form.formState.errors[question.id]?.message as string}
                    </p>
                  )}
                </div>
              </div>
            </GradientCard>
          ))}

          {/* E-mail opcional */}
          <GradientCard variant="subtle">
            <div className="space-y-4">
              <div className="flex items-center space-x-2">
                <User className="h-5 w-5 text-muted-foreground" />
                <Label className="text-base font-medium">
                  Seu e-mail (opcional)
                </Label>
              </div>
              <Input
                {...form.register('respondent_email')}
                type="email"
                placeholder="seu@email.com"
              />
              <p className="text-xs text-muted-foreground">
                Deixe seu e-mail caso queira receber atualizações sobre o projeto.
              </p>
            </div>
          </GradientCard>

          {/* Submit */}
          <div className="flex justify-center pt-4">
            <Button 
              type="submit" 
              variant="gradient" 
              size="lg" 
              disabled={submitting}
              className="min-w-48"
            >
              {submitting ? 'Enviando...' : 'Enviar Respostas'}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default BriefingResponse;