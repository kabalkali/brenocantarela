import { Button } from '@/components/ui/button';
import { GradientCard } from '@/components/ui/gradient-card';
import { FileText, Users, Zap, CheckCircle, ArrowRight, BarChart3 } from 'lucide-react';
import { Link } from 'react-router-dom';

const Index = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-background to-muted">
      {/* Hero Section */}
      <section className="container mx-auto px-4 py-16">
        <div className="text-center max-w-4xl mx-auto">
          <h1 className="text-5xl md:text-6xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent mb-6">
            Sistema de Briefing
          </h1>
          <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
            Crie briefings personalizados, envie para clientes e colete respostas de forma elegante e profissional.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
            <Button asChild variant="gradient" size="lg" className="text-lg px-8 py-6">
              <Link to="/dashboard">
                <FileText className="h-5 w-5 mr-2" />
                Acessar Dashboard
                <ArrowRight className="h-5 w-5 ml-2" />
              </Link>
            </Button>
            
            <Button asChild variant="outline" size="lg" className="text-lg px-8 py-6">
              <a href="#features">
                Ver Funcionalidades
              </a>
            </Button>
          </div>

          {/* Preview Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-16">
            <GradientCard variant="hero">
              <div className="text-center">
                <div className="p-3 bg-primary/10 rounded-lg w-fit mx-auto mb-4">
                  <FileText className="h-8 w-8 text-primary" />
                </div>
                <h3 className="font-semibold text-lg mb-2">Criar Briefings</h3>
                <p className="text-muted-foreground text-sm">
                  Interface intuitiva para criar briefings com perguntas personalizadas
                </p>
              </div>
            </GradientCard>

            <GradientCard variant="subtle">
              <div className="text-center">
                <div className="p-3 bg-secondary/10 rounded-lg w-fit mx-auto mb-4">
                  <Users className="h-8 w-8 text-secondary" />
                </div>
                <h3 className="font-semibold text-lg mb-2">Coletar Respostas</h3>
                <p className="text-muted-foreground text-sm">
                  Clientes respondem sem precisar criar conta ou fazer login
                </p>
              </div>
            </GradientCard>

            <GradientCard variant="default">
              <div className="text-center">
                <div className="p-3 bg-success/10 rounded-lg w-fit mx-auto mb-4">
                  <BarChart3 className="h-8 w-8 text-success" />
                </div>
                <h3 className="font-semibold text-lg mb-2">Visualizar Dados</h3>
                <p className="text-muted-foreground text-sm">
                  Dashboard completo para analisar todas as respostas
                </p>
              </div>
            </GradientCard>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-16 bg-gradient-to-b from-muted/20 to-background">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Funcionalidades Principais</h2>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              Tudo que você precisa para criar briefings profissionais e coletar informações valiosas
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                icon: <Zap className="h-6 w-6" />,
                title: "Interface Moderna",
                description: "Design responsivo e mobile-first para uma experiência perfeita em qualquer dispositivo"
              },
              {
                icon: <CheckCircle className="h-6 w-6" />,
                title: "Múltiplos Tipos de Pergunta",
                description: "Texto curto, longo, múltipla escolha, e-mail e números - tudo validado automaticamente"
              },
              {
                icon: <Users className="h-6 w-6" />,
                title: "Sem Login para Clientes",
                description: "Clientes respondem diretamente através de link público, sem complicações"
              },
              {
                icon: <FileText className="h-6 w-6" />,
                title: "Links Únicos",
                description: "Cada briefing tem um slug único e link personalizado para compartilhamento"
              },
              {
                icon: <BarChart3 className="h-6 w-6" />,
                title: "Dashboard Completo",
                description: "Visualize todas as respostas, gerencie briefings e exporte dados facilmente"
              },
              {
                icon: <Zap className="h-6 w-6" />,
                title: "Tempo Real",
                description: "Respostas são salvas instantaneamente com feedback imediato ao usuário"
              }
            ].map((feature, index) => (
              <GradientCard key={index} variant="default" className="hover:shadow-lg transition-all duration-300">
                <div className="space-y-4">
                  <div className="p-2 bg-primary/10 rounded-lg w-fit">
                    {feature.icon}
                  </div>
                  <h3 className="font-semibold text-lg">{feature.title}</h3>
                  <p className="text-muted-foreground">{feature.description}</p>
                </div>
              </GradientCard>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16">
        <div className="container mx-auto px-4 text-center">
          <GradientCard variant="hero" className="max-w-2xl mx-auto">
            <h2 className="text-3xl font-bold mb-4">Pronto para Começar?</h2>
            <p className="text-muted-foreground mb-6">
              Crie seu primeiro briefing agora e comece a coletar informações valiosas dos seus clientes.
            </p>
            <Button asChild variant="gradient" size="lg">
              <Link to="/dashboard">
                <FileText className="h-5 w-5 mr-2" />
                Criar Primeiro Briefing
              </Link>
            </Button>
          </GradientCard>
        </div>
      </section>
    </div>
  );
};

export default Index;
