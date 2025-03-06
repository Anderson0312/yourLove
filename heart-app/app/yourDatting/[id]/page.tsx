'use client'
import { useEffect, useState } from 'react';
import { getRegistrationData } from '@/services/api';
import LayoutNetflix from '@/app/layouts/LayoutNetflix';
import LayoutPadrao from '@/app/layouts/LayoutPadrao';
import { useParams } from 'next/navigation';
import HeartLoader from '@/components/HeartLoader';

interface FormData {
    title: string;
    username: string;
    names: string;
    date: string;
    text: string;
    layout: string;
    music: string;
    musicThumbnail: string;
    musicVideoId: string;
    photo: File[] | null ; // Objetos File originais
    photoPaths: string[] | null; // Caminhos das fotos retornados pelo backend
  }

export default function Home() {
     const [data, setData] = useState<FormData>({
        title: '',
        username: '',
        date: '',
        names: '',
        text: '',
        layout: '',
        music: '',
        musicThumbnail: '',
        musicVideoId: '',
        photo: null,
        photoPaths: null,
      });
    const [layout, setLayout] = useState(data.layout || "padrao");
    const params = useParams();
    const userId = Array.isArray(params.id) ? params.id[0] : params.id;
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (userId) {
            const fetchData = async () => {
                try {
                    const response = await getRegistrationData(userId);
                    setData(response);
                } catch (error) {
                    console.error('Erro ao buscar dados:', error);
                } finally {
                    setLoading(false);
                }
            };
    
            fetchData();
        }
    }, [userId]);
    
    useEffect(() => {
        if (data.layout) {
          setLayout(data.layout);
        }
      }, [data.layout]); 


    if (loading) {
        return <HeartLoader/>; 
    }


    return (
        <>
            {layout === "padrao" ? (
              
                <LayoutPadrao/>
                
            ) : (
                
                <LayoutNetflix/>
                
            )}
        </>
    );
}
