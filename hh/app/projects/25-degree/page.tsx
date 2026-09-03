import type { Metadata } from 'next'
import { DegreeShowcase } from './showcase'

export const metadata: Metadata = {
  title: '25° 外卖｜校园本地生活服务平台',
  description: '连接学生、商家与骑手的校园外卖三端产品案例。',
}

export default function Page() {
  return <DegreeShowcase />
}
