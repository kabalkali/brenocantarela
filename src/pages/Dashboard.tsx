import { useState, useEffect } from 'react';
import { Plus, FileText, Users, Trash2, ExternalLink, LogOut } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { GradientCard } from '@/components/ui/gradient-card';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { ThemeToggle } from '@/components/ThemeToggle';
import { getAllBriefings, deleteBriefing } from '@/lib/supabase';
import { Briefing } from '@/types/briefing';
import { useToast } from '@/hooks/use-toast';
import CreateBriefingForm from '@/components/CreateBriefingForm';

const Dashboard = () => {
  const [briefings, setBriefings] = useState<Briefing[]>([]);
  const [loading, setLoading] = useState(true);
  const [dialogOpen, setDialogOpen] = useState(false);
  const { toast } = useToast();
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('isAuthenticated');
    navigate('/');
  };

  const loadBriefings = async () => {
    try {
      const data = await getAllBriefings();
      setBriefings(data);
    } catch (error) {
      toast({
        title: "Erro",
        description: "Não foi possível carregar os briefings",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadBriefings();
  }, []);

  const handleDelete = async (id: string, title: string) => {
    if (!confirm(`Tem certeza que deseja deletar o briefing "${title}"?`)) return;

    try {
      await deleteBriefing(id);
      await loadBriefings();
      toast({
        title: "Sucesso",
        description: "Briefing deletado com sucesso",
      });
    } catch (error) {
      toast({
        title: "Erro",
        description: "Não foi possível deletar o briefing",
        variant: "destructive",
      });
    }
  };

  const handleBriefingCreated = () => {
    setDialogOpen(false);
    loadBriefings();
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-background to-muted flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="text-muted-foreground">Carregando briefings...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-background to-muted">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex justify-between items-start mb-4">
            <div>
              <h1 className="text-4xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent mb-2">
                Dashboard de Briefings
              </h1>
              <p className="text-muted-foreground text-lg">
                Gerencie seus briefings e visualize as respostas dos clientes
              </p>
            </div>
            <div className="flex items-center gap-2">
              <ThemeToggle />
              <Button variant="outline" size="icon" onClick={handleLogout}>
                <LogOut className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <GradientCard variant="hero">
            <div className="flex items-center space-x-4">
              <div className="p-3 bg-primary/10 rounded-lg">
                <FileText className="h-6 w-6 text-primary" />
              </div>
              <div>
                <p className="text-2xl font-bold">{briefings.length}</p>
                <p className="text-muted-foreground">Briefings Criados</p>
              </div>
            </div>
          </GradientCard>

          <GradientCard variant="subtle">
            <div className="flex items-center space-x-4">
              <div className="p-3 bg-secondary/10 rounded-lg">
                <Users className="h-6 w-6 text-secondary" />
              </div>
              <div>
                <p className="text-2xl font-bold">
                  {briefings.filter(b => b.created_at).length}
                </p>
                <p className="text-muted-foreground">Total Ativos</p>
              </div>
            </div>
          </GradientCard>

          <GradientCard variant="default">
            <div className="flex items-center justify-center">
              <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
                <DialogTrigger asChild>
                  <Button variant="gradient" size="lg" className="w-full">
                    <Plus className="h-5 w-5 mr-2" />
                    Novo Briefing
                  </Button>
                </DialogTrigger>
                <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
                  <DialogHeader>
                    <DialogTitle>Criar Novo Briefing</DialogTitle>
                  </DialogHeader>
                  <CreateBriefingForm onSuccess={handleBriefingCreated} />
                </DialogContent>
              </Dialog>
            </div>
          </GradientCard>
        </div>

        {/* Briefings List */}
        <div className="space-y-4">
          <h2 className="text-2xl font-semibold mb-4">Seus Briefings</h2>
          
          {briefings.length === 0 ? (
            <GradientCard variant="subtle" className="text-center py-12">
              <FileText className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
              <h3 className="text-lg font-semibold mb-2">Nenhum briefing criado</h3>
              <p className="text-muted-foreground mb-4">
                Crie seu primeiro briefing para começar a coletar respostas dos clientes
              </p>
              <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
                <DialogTrigger asChild>
                  <Button variant="gradient">
                    <Plus className="h-4 w-4 mr-2" />
                    Criar Primeiro Briefing
                  </Button>
                </DialogTrigger>
                <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
                  <DialogHeader>
                    <DialogTitle>Criar Novo Briefing</DialogTitle>
                  </DialogHeader>
                  <CreateBriefingForm onSuccess={handleBriefingCreated} />
                </DialogContent>
              </Dialog>
            </GradientCard>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {briefings.map((briefing) => (
                <GradientCard key={briefing.id} variant="default" className="hover:shadow-lg transition-all duration-300">
                  <div className="space-y-4">
                    <div>
                      <h3 className="font-semibold text-lg mb-2">{briefing.title}</h3>
                      {briefing.description && (
                        <p className="text-muted-foreground text-sm line-clamp-2">
                          {briefing.description}
                        </p>
                      )}
                    </div>

                    <div className="text-xs text-muted-foreground">
                      Criado em {new Date(briefing.created_at).toLocaleDateString('pt-BR')}
                    </div>

                    <div className="flex space-x-2">
                      <Button
                        variant="outline"
                        size="sm"
                        asChild
                        className="flex-1"
                      >
                        <a 
                          href={`/briefing/${briefing.slug}`} 
                          target="_blank" 
                          rel="noopener noreferrer"
                        >
                          <ExternalLink className="h-4 w-4 mr-2" />
                          Ver Briefing
                        </a>
                      </Button>

                      <Button
                        variant="outline"
                        size="sm"
                        asChild
                        className="flex-1"
                      >
                        <a href={`/briefing/${briefing.slug}/results`}>
                          <Users className="h-4 w-4 mr-2" />
                          Ver Respostas
                        </a>
                      </Button>

                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleDelete(briefing.id, briefing.title)}
                        className="text-destructive hover:text-destructive"
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
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

export default Dashboard;