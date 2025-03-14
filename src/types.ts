export interface Dependente {
    id?: string;
    name: string;
    cpf: string;
    rg: string;
    birthDate: string;
    needs: string[];
  }
  
  export interface Beneficiario {
    id?: string;
    name: string;
    cpf: string;
    rg: string;
    email: string;
    phone: string;
    address: string;
    number: number;
    cep: string;
    neighborhood: string;
    city: string;
    state: string;
    complement: string;
    motherName: string;
    birthDate: string;
    status?: string;
    needs: string;
    dependentIds: string[] | null;
    createdAt?: string;

  }