export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  // Allows to automatically instanciate createClient with right options
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
