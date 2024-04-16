import { Logradouro } from './Logradouro';

export interface Cliente {
    id: number;
    nome: string;
    email: string;
    logotipo: string;
    logradouros: Logradouro[];
}