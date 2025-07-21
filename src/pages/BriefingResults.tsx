import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, Calendar, Mail, FileText } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { GradientCard } from '@/components/ui/gradient-card';
import { getBriefingBySlug, getBriefingResponses } from '@/lib/supabase';
import { BriefingWithQuestions, Response } from '@/types/briefing';
import { useToast } from '@/hooks/use-toast';

const BriefingResults = () => {
  const { slug } = useParams<{ slug: string }>();
  const [briefing, setBriefing] = useState<BriefingWithQuestions | null>(null);
  const [responses, setResponses] = useState<Response[]>([]);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    const loadData = async () => {
      if (!slug) return;

      try {
        const briefingData = await getBriefingBySlug(slug);
        if (!briefingData) {
          toast({
            title: "Erro",
            description: "Briefing não encontrado",
            variant: "destructive",
          });
          return;
        }

        setBriefing(briefingData);
        
        const responsesData = await getBriefingResponses(briefingData.id);
        setResponses(responsesData);
      } catch (error) {
        toast({
          title: "Erro",
          description: "Não foi possível carregar os dados",
          variant: "destructive",
        });
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, [slug, toast]);

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-background to-muted flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="text-muted-foreground">Carregando respostas...</p>
        </div>
      </div>
    );
  }

  if (!briefing) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-background to-muted flex items-center justify-center">
        <div className="text-center">
          <FileText className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
          <h2 className="text-2xl font-semibold mb-2">Briefing não encontrado</h2>
          <p className="text-muted-foreground mb-4">O briefing solicitado não existe ou foi removido.</p>
          <Button asChild>
            <Link to="/dashboard">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Voltar ao Dashboard
            </Link>
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-background to-muted">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <Button variant="ghost" asChild className="mb-4">
            <Link to="/dashboard">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Voltar ao Dashboard
            </Link>
          </Button>
          
          <h1 className="text-4xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent mb-2">
            {briefing.title}
          </h1>
          {briefing.description && (
            <p className="text-muted-foreground text-lg">{briefing.description}</p>
          )}
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <GradientCard variant="hero">
            <div className="flex items-center space-x-4">
              <div className="p-3 bg-primary/10 rounded-lg">
                <FileText className="h-6 w-6 text-primary" />
              </div>
              <div>
                <p className="text-2xl font-bold">{responses.length}</p>
                <p className="text-muted-foreground">Respostas Recebidas</p>
              </div>
            </div>
          </GradientCard>

          <GradientCard variant="subtle">
            <div className="flex items-center space-x-4">
              <div className="p-3 bg-secondary/10 rounded-lg">
                <Calendar className="h-6 w-6 text-secondary" />
              </div>
              <div>
                <p className="text-2xl font-bold">{briefing.questions.length}</p>
                <p className="text-muted-foreground">Perguntas</p>
              </div>
            </div>
          </GradientCard>

          <GradientCard variant="default">
            <div className="flex items-center space-x-4">
              <div className="p-3 bg-accent/10 rounded-lg">
                <Mail className="h-6 w-6 text-accent" />
              </div>
              <div>
                <p className="text-2xl font-bold">
                  {responses.filter(r => r.respondent_email).length}
                </p>
                <p className="text-muted-foreground">Com E-mail</p>
              </div>
            </div>
          </GradientCard>
        </div>

        {/* Responses */}
        <div className="space-y-6">
          <h2 className="text-2xl font-semibold">Respostas</h2>
          
          {responses.length === 0 ? (
            <GradientCard variant="subtle" className="text-center py-12">
              <FileText className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
              <h3 className="text-lg font-semibold mb-2">Nenhuma resposta ainda</h3>
              <p className="text-muted-foreground mb-4">
                Compartilhe o link do briefing para começar a receber respostas
              </p>
              <Button variant="outline" asChild>
                <Link to={`/briefing/${briefing.slug}`} target="_blank">
                  Ver Briefing Público
                </Link>
              </Button>
            </GradientCard>
          ) : (
            <div className="space-y-4">
              {responses.map((response, index) => (
                <GradientCard key={response.id} variant="default">
                  <div className="space-y-4">
                    <div className="flex justify-between items-center">
                      <h3 className="font-semibold">Resposta #{index + 1}</h3>
                      <div className="text-sm text-muted-foreground">
                        {new Date(response.created_at).toLocaleString('pt-BR')}
                      </div>
                    </div>

                    {response.respondent_email && (
                      <div className="flex items-center text-sm text-muted-foreground">
                        <Mail className="h-4 w-4 mr-2" />
                        {response.respondent_email}
                      </div>
                    )}

                    <div className="space-y-3">
                      {briefing.questions.map((question) => {
                        const answer = response.answers[question.id];
                        if (!answer) return null;

                        return (
                          <div key={question.id} className="border-l-2 border-primary/20 pl-4">
                            <p className="font-medium text-sm mb-2">{question.text}</p>
                            <div className="text-muted-foreground">
                              {Array.isArray(answer) ? (
                                <ul className="list-disc list-inside">
                                  {answer.map((item, i) => (
                                    <li key={i}>{item}</li>
                                  ))}
                                </ul>
                              ) : (
                                <p>{answer}</p>
                              )}
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                </GradientCard>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default BriefingResults;