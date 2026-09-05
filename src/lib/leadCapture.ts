export type LeadPayload = {
  name: string;
  company: string;
  role: string;
  contact: string;
  preferredChannel: 'line' | 'email' | 'phone';
  workflow: string;
  frequency: string;
  teamSize: string;
  consent: boolean;
  source: string;
  pageUrl: string;
  submittedAt: string;
  score: number;
  stage: 'new';
};

const STORAGE_KEY = 'gracer-ai-leads';

export function calculateLeadScore(lead: Pick<LeadPayload, 'frequency' | 'teamSize' | 'preferredChannel'>) {
  const frequencyScore: Record<string, number> = { daily: 35, weekly: 20, monthly: 10 };
  const teamScore: Record<string, number> = { '10+': 30, '4-9': 22, '1-3': 12 };
  const channelScore = lead.preferredChannel === 'line' ? 15 : 10;
  return (frequencyScore[lead.frequency] ?? 5) + (teamScore[lead.teamSize] ?? 5) + channelScore + 20;
}

export async function submitLead(payload: LeadPayload) {
  const webhookUrl = import.meta.env.VITE_LEAD_WEBHOOK_URL?.trim();

  if (!webhookUrl) {
    const current = JSON.parse(localStorage.getItem(STORAGE_KEY) ?? '[]') as LeadPayload[];
    localStorage.setItem(STORAGE_KEY, JSON.stringify([...current, payload]));
    return { stored: 'local' as const };
  }

  const response = await fetch(webhookUrl, {
    method: 'POST',
    headers: { 'Content-Type': 'text/plain;charset=utf-8' },
    body: JSON.stringify(payload),
  });

  if (!response.ok) throw new Error('ไม่สามารถส่งข้อมูลได้ กรุณาลองอีกครั้ง');
  const result = await response.json();
  if (!result.ok) throw new Error(result.error || 'ไม่สามารถบันทึกข้อมูลได้');
  return { stored: 'remote' as const };
}

