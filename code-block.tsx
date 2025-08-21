"use client"

import { useState } from "react"
import { Copy, Check } from "lucide-react"
import { Button } from "@/components/ui/button"

const codeExample = `function createNotionClone() {
  const components = {
    header: 'sticky navigation',
    content: 'flexible blocks',
    theme: 'dark/light mode'
  };
  
  return {
    ...components,
    responsive: true,
    minimalist: true
  };
}

// Khởi tạo ứng dụng
const app = createNotionClone();
console.log('Portfolio ready!', app);`

export default function CodeBlock() {
  const [copied, setCopied] = useState(false)

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(codeExample)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch (err) {
      console.error("Failed to copy text: ", err)
    }
  }

  return (
    <div className="relative bg-gray-900 dark:bg-gray-950 rounded-lg overflow-hidden">
      <div className="flex items-center justify-between px-4 py-2 bg-gray-800 dark:bg-gray-900 border-b border-gray-700">
        <span className="text-sm text-gray-300">JavaScript</span>
        <Button
          variant="ghost"
          size="sm"
          onClick={copyToClipboard}
          className="h-8 px-2 text-gray-300 hover:text-white hover:bg-gray-700"
        >
          {copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
          <span className="ml-1 text-xs">{copied ? "Copied!" : "Copy"}</span>
        </Button>
      </div>
      <pre className="p-4 overflow-x-auto">
        <code className="text-sm text-gray-100 font-mono leading-relaxed">
          <span className="text-purple-400">function</span> <span className="text-yellow-300">createNotionClone</span>
          <span className="text-gray-300">() {"{"}</span>
          {"\n  "}
          <span className="text-purple-400">const</span> <span className="text-blue-300">components</span>{" "}
          <span className="text-gray-300">= {"{"}</span>
          {"\n    "}
          <span className="text-green-300">header</span>
          <span className="text-gray-300">: </span>
          <span className="text-orange-300">'sticky navigation'</span>
          <span className="text-gray-300">,</span>
          {"\n    "}
          <span className="text-green-300">content</span>
          <span className="text-gray-300">: </span>
          <span className="text-orange-300">'flexible blocks'</span>
          <span className="text-gray-300">,</span>
          {"\n    "}
          <span className="text-green-300">theme</span>
          <span className="text-gray-300">: </span>
          <span className="text-orange-300">'dark/light mode'</span>
          {"\n  "}
          <span className="text-gray-300">{"};"}</span>
          {"\n  \n  "}
          <span className="text-purple-400">return</span> <span className="text-gray-300">{"{"}</span>
          {"\n    "}
          <span className="text-gray-300">...</span>
          <span className="text-blue-300">components</span>
          <span className="text-gray-300">,</span>
          {"\n    "}
          <span className="text-green-300">responsive</span>
          <span className="text-gray-300">: </span>
          <span className="text-purple-400">true</span>
          <span className="text-gray-300">,</span>
          {"\n    "}
          <span className="text-green-300">minimalist</span>
          <span className="text-gray-300">: </span>
          <span className="text-purple-400">true</span>
          {"\n  "}
          <span className="text-gray-300">{"};"}</span>
          {"\n"}
          <span className="text-gray-300">{"}"}</span>
          {"\n\n"}
          <span className="text-gray-500">// Khởi tạo ứng dụng</span>
          {"\n"}
          <span className="text-purple-400">const</span> <span className="text-blue-300">app</span>{" "}
          <span className="text-gray-300">= </span>
          <span className="text-yellow-300">createNotionClone</span>
          <span className="text-gray-300">();</span>
          {"\n"}
          <span className="text-blue-300">console</span>
          <span className="text-gray-300">.</span>
          <span className="text-yellow-300">log</span>
          <span className="text-gray-300">(</span>
          <span className="text-orange-300">'Portfolio ready!'</span>
          <span className="text-gray-300">, </span>
          <span className="text-blue-300">app</span>
          <span className="text-gray-300">);</span>
        </code>
      </pre>
    </div>
  )
}
