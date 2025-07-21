import { useState } from 'react';
import { useForm, useFieldArray } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Plus, Trash2, GripVertical } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { createBriefing } from '@/lib/supabase';
import { QuestionType } from '@/types/briefing';
import { Checkbox } from '@/components/ui/checkbox';

const questionSchema = z.object({
  text: z.string().min(5, 'A pergunta deve ter pelo menos 5 caracteres'),
  type: z.enum(['SHORT_TEXT', 'LONG_TEXT', 'MULTIPLE_CHOICE', 'EMAIL', 'NUMBER']),
  required: z.boolean(),
  options: z.array(z.string()).optional(),
});

const briefingSchema = z.object({
  title: z.string().min(3, 'O título deve ter pelo menos 3 caracteres'),
  description: z.string().optional(),
  questions: z.array(questionSchema).min(1, 'Adicione pelo menos uma pergunta'),
});

type BriefingFormData = z.infer<typeof briefingSchema>;

interface CreateBriefingFormProps {
  onSuccess: () => void;
}

const CreateBriefingForm = ({ onSuccess }: CreateBriefingFormProps) => {
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();

  const form = useForm<BriefingFormData>({
    resolver: zodResolver(briefingSchema),
    defaultValues: {
      title: '',
      description: '',
      questions: [
        { text: '', type: 'SHORT_TEXT', required: true, options: [] }
      ],
    },
  });

  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: 'questions',
  });

  const addQuestion = () => {
    append({ text: '', type: 'SHORT_TEXT', required: true, options: [] });
  };

  const addOption = (questionIndex: number) => {
    const currentOptions = form.getValues(`questions.${questionIndex}.options`) || [];
    form.setValue(`questions.${questionIndex}.options`, [...currentOptions, '']);
  };

  const removeOption = (questionIndex: number, optionIndex: number) => {
    const currentOptions = form.getValues(`questions.${questionIndex}.options`) || [];
    const newOptions = currentOptions.filter((_, index) => index !== optionIndex);
    form.setValue(`questions.${questionIndex}.options`, newOptions);
  };

  const onSubmit = async (data: BriefingFormData) => {
    setLoading(true);
    try {
      await createBriefing(data);
      toast({
        title: "Sucesso!",
        description: "Briefing criado com sucesso",
      });
      onSuccess();
    } catch (error) {
      toast({
        title: "Erro",
        description: "Não foi possível criar o briefing",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const getQuestionTypeLabel = (type: QuestionType) => {
    const labels = {
      SHORT_TEXT: 'Texto Curto',
      LONG_TEXT: 'Texto Longo',
      MULTIPLE_CHOICE: 'Múltipla Escolha',
      EMAIL: 'E-mail',
      NUMBER: 'Número',
    };
    return labels[type];
  };

  return (
    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
      {/* Informações Básicas */}
      <Card>
        <CardHeader>
          <CardTitle>Informações Básicas</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <Label htmlFor="title">Título do Briefing</Label>
            <Input
              id="title"
              {...form.register('title')}
              placeholder="Ex: Briefing para Desenvolvimento de Website"
            />
            {form.formState.errors.title && (
              <p className="text-destructive text-sm mt-1">
                {form.formState.errors.title.message}
              </p>
            )}
          </div>

          <div>
            <Label htmlFor="description">Descrição (Opcional)</Label>
            <Textarea
              id="description"
              {...form.register('description')}
              placeholder="Descreva o propósito deste briefing..."
              rows={3}
            />
          </div>
        </CardContent>
      </Card>

      {/* Perguntas */}
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle>Perguntas</CardTitle>
          <Button type="button" onClick={addQuestion} variant="outline" size="sm">
            <Plus className="h-4 w-4 mr-2" />
            Adicionar Pergunta
          </Button>
        </CardHeader>
        <CardContent className="space-y-4">
          {fields.map((field, index) => (
            <Card key={field.id} className="border-dashed">
              <CardContent className="pt-6">
                <div className="flex items-start space-x-2 mb-4">
                  <GripVertical className="h-5 w-5 text-muted-foreground mt-2" />
                  <div className="flex-1 space-y-4">
                    <div>
                      <Label>Pergunta {index + 1}</Label>
                      <Textarea
                        {...form.register(`questions.${index}.text`)}
                        placeholder="Digite sua pergunta..."
                        rows={2}
                      />
                      {form.formState.errors.questions?.[index]?.text && (
                        <p className="text-destructive text-sm mt-1">
                          {form.formState.errors.questions[index]?.text?.message}
                        </p>
                      )}
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <Label>Tipo de Resposta</Label>
                        <Select
                          value={form.watch(`questions.${index}.type`)}
                          onValueChange={(value) => 
                            form.setValue(`questions.${index}.type`, value as QuestionType)
                          }
                        >
                          <SelectTrigger>
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="SHORT_TEXT">Texto Curto</SelectItem>
                            <SelectItem value="LONG_TEXT">Texto Longo</SelectItem>
                            <SelectItem value="MULTIPLE_CHOICE">Múltipla Escolha</SelectItem>
                            <SelectItem value="EMAIL">E-mail</SelectItem>
                            <SelectItem value="NUMBER">Número</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>

                      <div className="flex items-center space-x-2 pt-6">
                        <Checkbox
                          id={`required-${index}`}
                          checked={form.watch(`questions.${index}.required`)}
                          onCheckedChange={(checked) => 
                            form.setValue(`questions.${index}.required`, !!checked)
                          }
                        />
                        <Label htmlFor={`required-${index}`}>Obrigatória</Label>
                      </div>
                    </div>

                    {/* Opções para múltipla escolha */}
                    {form.watch(`questions.${index}.type`) === 'MULTIPLE_CHOICE' && (
                      <div>
                        <div className="flex items-center justify-between mb-2">
                          <Label>Opções</Label>
                          <Button
                            type="button"
                            onClick={() => addOption(index)}
                            variant="outline"
                            size="sm"
                          >
                            <Plus className="h-3 w-3 mr-1" />
                            Opção
                          </Button>
                        </div>
                        
                        <div className="space-y-2">
                          {(form.watch(`questions.${index}.options`) || []).map((_, optionIndex) => (
                            <div key={optionIndex} className="flex space-x-2">
                              <Input
                                value={form.watch(`questions.${index}.options.${optionIndex}`) || ''}
                                onChange={(e) => {
                                  const currentOptions = form.getValues(`questions.${index}.options`) || [];
                                  const newOptions = [...currentOptions];
                                  newOptions[optionIndex] = e.target.value;
                                  form.setValue(`questions.${index}.options`, newOptions);
                                }}
                                placeholder={`Opção ${optionIndex + 1}`}
                              />
                              <Button
                                type="button"
                                onClick={() => removeOption(index, optionIndex)}
                                variant="outline"
                                size="sm"
                              >
                                <Trash2 className="h-4 w-4" />
                              </Button>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>

                  <Button
                    type="button"
                    onClick={() => remove(index)}
                    variant="outline"
                    size="sm"
                    className="text-destructive hover:text-destructive"
                    disabled={fields.length === 1}
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}

          {form.formState.errors.questions && (
            <p className="text-destructive text-sm">
              {form.formState.errors.questions.message}
            </p>
          )}
        </CardContent>
      </Card>

      {/* Ações */}
      <div className="flex justify-end space-x-4">
        <Button type="submit" variant="gradient" disabled={loading}>
          {loading ? 'Criando...' : 'Criar Briefing'}
        </Button>
      </div>
    </form>
  );
};

export default CreateBriefingForm;