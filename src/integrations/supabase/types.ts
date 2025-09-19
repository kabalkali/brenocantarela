export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  // Allows to automatically instantiate createClient with right options
  // instead of createClient<Database, { PostgrestVersion: 'XX' }>(URL, KEY)
  __InternalSupabase: {
    PostgrestVersion: "12.2.3 (519615d)"
  }
  public: {
    Tables: {
      admin_config: {
        Row: {
          admin_email: string
          created_at: string
          id: string
        }
        Insert: {
          admin_email: string
          created_at?: string
          id?: string
        }
        Update: {
          admin_email?: string
          created_at?: string
          id?: string
        }
        Relationships: []
      }
      bd_ativo: {
        Row: {
          created_at: string
          id: number
          num: number | null
        }
        Insert: {
          created_at?: string
          id?: number
          num?: number | null
        }
        Update: {
          created_at?: string
          id?: number
          num?: number | null
        }
        Relationships: []
      }
      briefings: {
        Row: {
          created_at: string
          description: string | null
          id: string
          slug: string
          title: string
          updated_at: string
        }
        Insert: {
          created_at?: string
          description?: string | null
          id?: string
          slug: string
          title: string
          updated_at?: string
        }
        Update: {
          created_at?: string
          description?: string | null
          id?: string
          slug?: string
          title?: string
          updated_at?: string
        }
        Relationships: []
      }
      ceps: {
        Row: {
          cep: string
          created_at: string
          logradouro: string
        }
        Insert: {
          cep: string
          created_at?: string
          logradouro: string
        }
        Update: {
          cep?: string
          created_at?: string
          logradouro?: string
        }
        Relationships: []
      }
      confirmations: {
        Row: {
          created_at: string
          guests_count: number
          id: string
          name: string
          updated_at: string
        }
        Insert: {
          created_at?: string
          guests_count?: number
          id?: string
          name: string
          updated_at?: string
        }
        Update: {
          created_at?: string
          guests_count?: number
          id?: string
          name?: string
          updated_at?: string
        }
        Relationships: []
      }
      convidados: {
        Row: {
          created_at: string
          id: string
          nome: string
          quantidade_pessoas: number
          updated_at: string
        }
        Insert: {
          created_at?: string
          id?: string
          nome: string
          quantidade_pessoas?: number
          updated_at?: string
        }
        Update: {
          created_at?: string
          id?: string
          nome?: string
          quantidade_pessoas?: number
          updated_at?: string
        }
        Relationships: []
      }
      daily_stats: {
        Row: {
          created_at: string
          date: string
          home_visits: number
          id: string
          spreadsheets_processed: number
          updated_at: string
        }
        Insert: {
          created_at?: string
          date: string
          home_visits?: number
          id?: string
          spreadsheets_processed?: number
          updated_at?: string
        }
        Update: {
          created_at?: string
          date?: string
          home_visits?: number
          id?: string
          spreadsheets_processed?: number
          updated_at?: string
        }
        Relationships: []
      }
      drawn_numbers: {
        Row: {
          created_at: string
          id: string
          numero: number
          participante_id: string | null
        }
        Insert: {
          created_at?: string
          id?: string
          numero: number
          participante_id?: string | null
        }
        Update: {
          created_at?: string
          id?: string
          numero?: number
          participante_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "drawn_numbers_participante_id_fkey"
            columns: ["participante_id"]
            isOneToOne: false
            referencedRelation: "participants"
            referencedColumns: ["id"]
          },
        ]
      }
      messages_to_couple: {
        Row: {
          created_at: string
          id: string
          is_approved: boolean
          message: string
          sender_name: string
          updated_at: string
        }
        Insert: {
          created_at?: string
          id?: string
          is_approved?: boolean
          message: string
          sender_name: string
          updated_at?: string
        }
        Update: {
          created_at?: string
          id?: string
          is_approved?: boolean
          message?: string
          sender_name?: string
          updated_at?: string
        }
        Relationships: []
      }
      participants: {
        Row: {
          bairro: string
          created_at: string
          id: string
          nome: string
          numero_sorteio: number
          telefone: string
          updated_at: string
        }
        Insert: {
          bairro: string
          created_at?: string
          id?: string
          nome: string
          numero_sorteio: number
          telefone: string
          updated_at?: string
        }
        Update: {
          bairro?: string
          created_at?: string
          id?: string
          nome?: string
          numero_sorteio?: number
          telefone?: string
          updated_at?: string
        }
        Relationships: []
      }
      ppt_pages: {
        Row: {
          content_css: string | null
          content_html: string
          created_at: string
          file_size: number
          id: string
          is_published: boolean
          original_filename: string
          slides_count: number
          slug: string
          title: string
          updated_at: string
          views_count: number
        }
        Insert: {
          content_css?: string | null
          content_html: string
          created_at?: string
          file_size: number
          id?: string
          is_published?: boolean
          original_filename: string
          slides_count?: number
          slug: string
          title: string
          updated_at?: string
          views_count?: number
        }
        Update: {
          content_css?: string | null
          content_html?: string
          created_at?: string
          file_size?: number
          id?: string
          is_published?: boolean
          original_filename?: string
          slides_count?: number
          slug?: string
          title?: string
          updated_at?: string
          views_count?: number
        }
        Relationships: []
      }
      prizes: {
        Row: {
          ativo: boolean
          created_at: string
          descricao: string | null
          id: string
          nome: string
          ordem: number
          updated_at: string
        }
        Insert: {
          ativo?: boolean
          created_at?: string
          descricao?: string | null
          id?: string
          nome: string
          ordem?: number
          updated_at?: string
        }
        Update: {
          ativo?: boolean
          created_at?: string
          descricao?: string | null
          id?: string
          nome?: string
          ordem?: number
          updated_at?: string
        }
        Relationships: []
      }
      questions: {
        Row: {
          briefing_id: string
          created_at: string
          id: string
          options: string[] | null
          order_index: number
          required: boolean
          text: string
          type: string
        }
        Insert: {
          briefing_id: string
          created_at?: string
          id?: string
          options?: string[] | null
          order_index?: number
          required?: boolean
          text: string
          type: string
        }
        Update: {
          briefing_id?: string
          created_at?: string
          id?: string
          options?: string[] | null
          order_index?: number
          required?: boolean
          text?: string
          type?: string
        }
        Relationships: [
          {
            foreignKeyName: "questions_briefing_id_fkey"
            columns: ["briefing_id"]
            isOneToOne: false
            referencedRelation: "briefings"
            referencedColumns: ["id"]
          },
        ]
      }
      raffle_config: {
        Row: {
          ativo: boolean
          created_at: string
          id: string
          max_participantes: number
          nome_sorteio: string
          updated_at: string
        }
        Insert: {
          ativo?: boolean
          created_at?: string
          id?: string
          max_participantes?: number
          nome_sorteio?: string
          updated_at?: string
        }
        Update: {
          ativo?: boolean
          created_at?: string
          id?: string
          max_participantes?: number
          nome_sorteio?: string
          updated_at?: string
        }
        Relationships: []
      }
      responses: {
        Row: {
          answers: Json
          briefing_id: string
          created_at: string
          id: string
          respondent_email: string | null
        }
        Insert: {
          answers: Json
          briefing_id: string
          created_at?: string
          id?: string
          respondent_email?: string | null
        }
        Update: {
          answers?: Json
          briefing_id?: string
          created_at?: string
          id?: string
          respondent_email?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "responses_briefing_id_fkey"
            columns: ["briefing_id"]
            isOneToOne: false
            referencedRelation: "briefings"
            referencedColumns: ["id"]
          },
        ]
      }
      whatsapp_auth_sessions: {
        Row: {
          created_at: string
          id: string
          session_data: Json
          session_id: string
          updated_at: string
        }
        Insert: {
          created_at?: string
          id?: string
          session_data: Json
          session_id: string
          updated_at?: string
        }
        Update: {
          created_at?: string
          id?: string
          session_data?: Json
          session_id?: string
          updated_at?: string
        }
        Relationships: []
      }
      whatsapp_logs: {
        Row: {
          created_at: string
          from_number: string
          id: string
          message_body: string | null
          response_sent: string | null
          session_id: string
        }
        Insert: {
          created_at?: string
          from_number: string
          id?: string
          message_body?: string | null
          response_sent?: string | null
          session_id: string
        }
        Update: {
          created_at?: string
          from_number?: string
          id?: string
          message_body?: string | null
          response_sent?: string | null
          session_id?: string
        }
        Relationships: []
      }
      whatsapp_messages: {
        Row: {
          created_at: string
          description: string
          id: string
          is_active: boolean
          response: string[]
          trigger: string
          updated_at: string
        }
        Insert: {
          created_at?: string
          description: string
          id?: string
          is_active?: boolean
          response: string[]
          trigger: string
          updated_at?: string
        }
        Update: {
          created_at?: string
          description?: string
          id?: string
          is_active?: boolean
          response?: string[]
          trigger?: string
          updated_at?: string
        }
        Relationships: []
      }
      whatsapp_sessions: {
        Row: {
          created_at: string
          id: string
          is_connected: boolean
          last_connected: string | null
          qr_code: string | null
          session_data: Json | null
          session_id: string
          updated_at: string
        }
        Insert: {
          created_at?: string
          id?: string
          is_connected?: boolean
          last_connected?: string | null
          qr_code?: string | null
          session_data?: Json | null
          session_id: string
          updated_at?: string
        }
        Update: {
          created_at?: string
          id?: string
          is_connected?: boolean
          last_connected?: string | null
          qr_code?: string | null
          session_data?: Json | null
          session_id?: string
          updated_at?: string
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      generate_random_participant_number: {
        Args: Record<PropertyKey, never>
        Returns: number
      }
      get_available_spots: {
        Args: Record<PropertyKey, never>
        Returns: number
      }
      increment_home_visits: {
        Args: Record<PropertyKey, never>
        Returns: undefined
      }
      increment_spreadsheets_processed: {
        Args: Record<PropertyKey, never>
        Returns: undefined
      }
      is_admin: {
        Args: Record<PropertyKey, never>
        Returns: boolean
      }
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DatabaseWithoutInternals = Omit<Database, "__InternalSupabase">

type DefaultSchema = DatabaseWithoutInternals[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof DatabaseWithoutInternals },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof DatabaseWithoutInternals },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {},
  },
} as const
