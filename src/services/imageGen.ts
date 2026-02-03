/**
 * Nanobanana API Service
 * 
 * Google Gemini 기반의 이미지 생성 API (Nanobanana)를 연동하기 위한 서비스 레이어입니다.
 * 실제 API 키는 .env 파일의 VITE_NANOBANANA_API_KEY 항목에 설정해야 합니다.
 */

export interface ImageGenOptions {
    model?: 'nano-banana' | 'nano-banana-pro';
    aspectRatio?: '1:1' | '4:3' | '16:9';
    pageSize?: '1K' | '2K' | '4K';
}

export const generateArticleImage = async (
    prompt: string,
    options: ImageGenOptions = {}
): Promise<string> => {
    const API_KEY = import.meta.env.VITE_NANOBANANA_API_KEY;

    if (!API_KEY) {
        console.warn('Nanobanana API Key가 설정되지 않았습니다. 플레이스홀더 이미지를 반환합니다.');
        return `https://images.unsplash.com/photo-1620712943543-bcc4688e7485?q=80&w=1000&auto=format&fit=crop`;
    }

    try {
        const response = await fetch('https://api.nanobanana.ai/v1/generate', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${API_KEY}`
            },
            body: JSON.stringify({
                prompt,
                model: options.model || 'nano-banana',
                aspect_ratio: options.aspectRatio || '16:9',
                size: options.pageSize || '1K'
            })
        });

        if (!response.ok) {
            throw new Error(`API Request failed: ${response.statusText}`);
        }

        const data = await response.json();
        return data.image_url;
    } catch (error) {
        console.error('Image Generation Error:', error);
        // 에러 발생 시 기본 샘플 이미지 반환
        return `https://images.unsplash.com/photo-1620712943543-bcc4688e7485?q=80&w=1000&auto=format&fit=crop`;
    }
};
