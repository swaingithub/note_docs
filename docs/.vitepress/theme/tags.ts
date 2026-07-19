// Shared tag registry. Each tag maps to a list of { text, link } entries.
// Used by RelatedPages and the tag filter. Keep links relative (no leading slash issues).

export interface TagEntry {
  text: string
  link: string
}

export const TAGS: Record<string, TagEntry[]> = {
  javascript: [
    { text: 'JavaScript', link: '/languages/javascript' },
    { text: 'TypeScript', link: '/languages/typescript' },
    { text: 'Web Development', link: '/courses/web-development/' },
    { text: 'HTML / CSS', link: '/languages/html-css' },
  ],
  typescript: [
    { text: 'TypeScript', link: '/languages/typescript' },
    { text: 'JavaScript', link: '/languages/javascript' },
  ],
  web: [
    { text: 'Web Development', link: '/courses/web-development/' },
    { text: 'HTML / CSS', link: '/languages/html-css' },
    { text: 'JavaScript', link: '/languages/javascript' },
    { text: 'TypeScript', link: '/languages/typescript' },
  ],
  python: [
    { text: 'Python', link: '/languages/python' },
    { text: 'Machine Learning', link: '/courses/machine-learning/' },
    { text: 'Data Structures & Algorithms', link: '/courses/dsa/' },
  ],
  backend: [
    { text: 'Node / JS', link: '/languages/javascript' },
    { text: 'Python', link: '/languages/python' },
    { text: 'Java', link: '/languages/java' },
    { text: 'Go', link: '/languages/go' },
    { text: 'Web Development', link: '/courses/web-development/' },
  ],
  devops: [
    { text: 'Docker & Containers', link: '/courses/docker/' },
    { text: 'Kubernetes', link: '/courses/kubernetes/' },
    { text: 'DevOps & Cloud', link: '/courses/devops/' },
    { text: 'Bash / Shell', link: '/languages/bash' },
  ],
  containers: [
    { text: 'Docker & Containers', link: '/courses/docker/' },
    { text: 'Kubernetes', link: '/courses/kubernetes/' },
    { text: 'DevOps & Cloud', link: '/courses/devops/' },
  ],
  cloud: [
    { text: 'DevOps & Cloud', link: '/courses/devops/' },
    { text: 'Docker & Containers', link: '/courses/docker/' },
    { text: 'Kubernetes', link: '/courses/kubernetes/' },
  ],
  data: [
    { text: 'Databases', link: '/courses/databases/' },
    { text: 'SQL', link: '/languages/sql' },
    { text: 'Python', link: '/languages/python' },
    { text: 'Machine Learning', link: '/courses/machine-learning/' },
  ],
  ml: [
    { text: 'Machine Learning', link: '/courses/machine-learning/' },
    { text: 'Python', link: '/languages/python' },
    { text: 'Data Structures & Algorithms', link: '/courses/dsa/' },
  ],
  algorithms: [
    { text: 'Data Structures & Algorithms', link: '/courses/dsa/' },
    { text: 'Python', link: '/languages/python' },
    { text: 'Java', link: '/languages/java' },
    { text: 'C++', link: '/languages/cpp' },
  ],
  mobile: [
    { text: 'Mobile Development', link: '/courses/mobile/' },
    { text: 'Swift', link: '/languages/swift' },
    { text: 'Kotlin', link: '/languages/kotlin' },
    { text: 'Java', link: '/languages/java' },
  ],
  security: [
    { text: 'Cybersecurity', link: '/courses/cybersecurity/' },
    { text: 'DevOps & Cloud', link: '/courses/devops/' },
    { text: 'Docker & Containers', link: '/courses/docker/' },
  ],
  systems: [
    { text: 'System Design', link: '/courses/system-design/' },
    { text: 'Data Structures & Algorithms', link: '/courses/dsa/' },
    { text: 'Databases', link: '/courses/databases/' },
    { text: 'C++', link: '/languages/cpp' },
    { text: 'Rust', link: '/languages/rust' },
  ],
  cs: [
    { text: 'Computer Science (OSSU)', link: '/courses/computer-science/' },
    { text: 'Data Structures & Algorithms', link: '/courses/dsa/' },
    { text: 'System Design', link: '/courses/system-design/' },
  ],
  beginner: [
    { text: 'JavaScript', link: '/languages/javascript' },
    { text: 'Python', link: '/languages/python' },
    { text: 'HTML / CSS', link: '/languages/html-css' },
    { text: 'Web Development', link: '/courses/web-development/' },
  ],
  interview: [
    { text: 'Data Structures & Algorithms', link: '/courses/dsa/' },
    { text: 'System Design', link: '/courses/system-design/' },
    { text: 'Databases', link: '/courses/databases/' },
    { text: 'Cybersecurity', link: '/courses/cybersecurity/' },
  ],
}

// Map a route path to its tags.
export function tagsForPath(path: string): string[] {
  const out = new Set<string>()
  if (path.includes('/languages/')) {
    const seg = path.split('/languages/')[1]?.split('/')[0]
    if (seg) out.add(seg)
    if (['javascript', 'typescript', 'html-css'].includes(seg || '')) out.add('web')
    if (['python', 'java', 'go', 'cpp', 'csharp', 'rust'].includes(seg || '')) out.add('backend')
    if (['python', 'sql'].includes(seg || '')) out.add('data')
    if (['swift', 'kotlin'].includes(seg || '')) out.add('mobile')
    out.add('beginner')
  }
  if (path.includes('/courses/')) {
    if (path.includes('/docker/')) { out.add('docker'); out.add('containers'); out.add('devops') }
    if (path.includes('/kubernetes/')) { out.add('kubernetes'); out.add('containers'); out.add('cloud') }
    if (path.includes('/devops/')) out.add('devops')
    if (path.includes('/machine-learning/')) { out.add('ml'); out.add('python'); out.add('data') }
    if (path.includes('/dsa/')) { out.add('algorithms'); out.add('interview') }
    if (path.includes('/databases/')) { out.add('data'); out.add('interview') }
    if (path.includes('/system-design/')) { out.add('systems'); out.add('interview') }
    if (path.includes('/cybersecurity/')) { out.add('security'); out.add('interview') }
    if (path.includes('/mobile/')) out.add('mobile')
    if (path.includes('/computer-science/')) out.add('cs')
    if (path.includes('/web-development/')) out.add('web')
  }
  return Array.from(out)
}
