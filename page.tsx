'use client'

import { motion, useScroll, useSpring } from 'framer-motion'
import Image from 'next/image'
import Link from 'next/link'
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Brain, Github, Twitter, Mail, ExternalLink, Terminal, Cpu, Network } from 'lucide-react'
import { useEffect, useState } from 'react'

const fadeIn = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.5 }
}

export default function Portfolio() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  const { scrollYProgress } = useScroll()
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  })
  
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY })
    }
    window.addEventListener('mousemove', handleMouseMove)
    return () => window.removeEventListener('mousemove', handleMouseMove)
  }, [])

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id)
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' })
    }
  }

  return (
    <div className="min-h-screen bg-gray-900 text-gray-100">
      {/* Gradient Background */}
      <div 
        className="fixed inset-0 bg-gradient-to-br from-blue-900/30 via-gray-900 to-purple-900/30"
        style={{
          transform: `translate(${mousePosition.x * 0.02}px, ${mousePosition.y * 0.02}px)`,
          transition: 'transform 0.2s ease-out'
        }}
      />

      {/* Progress Bar */}
      <motion.div
        className="fixed top-0 left-0 right-0 h-1 bg-gradient-to-r from-cyan-500 to-purple-500 z-50"
        style={{ scaleX }}
      />

      {/* Navigation */}
      <nav className="fixed w-full z-40 backdrop-blur-sm bg-gray-900/50">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <motion.span 
            className="text-xl font-bold text-cyan-400"
            {...fadeIn}
          >
            SP
          </motion.span>
          <div className="flex gap-6">
            {['About', 'Projects', 'Research', 'Contact'].map((item, i) => (
              <motion.button
                key={item}
                onClick={() => scrollToSection(item.toLowerCase())}
                className="text-gray-300 hover:text-cyan-400 transition-colors"
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
              >
                {item}
              </motion.button>
            ))}
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section id="about" className="relative container mx-auto px-4 pt-32 pb-20">
        <div className="flex flex-col md:flex-row items-center gap-12">
          <motion.div 
            className="w-48 h-48 relative rounded-full overflow-hidden border-4 border-cyan-500/50"
            initial={{ scale: 0.5, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            <Image
              src="/placeholder.svg"
              alt="Profile"
              fill
              className="object-cover"
            />
          </motion.div>
          <div>
            <h1 className="text-5xl font-bold mb-4 text-cyan-400">
              Shreyansh Parashar
            </h1>
            <motion.h2 
              className="text-2xl text-purple-400 mb-6"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
            >
              AI Engineer
            </motion.h2>
            <motion.div 
              className="flex gap-4"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
            >
              <Link 
                href="https://twitter.com/airfusions" 
                target="_blank"
                className="text-gray-300 hover:text-cyan-400 transition-colors flex items-center gap-2 bg-gray-800/50 px-4 py-2 rounded-full"
              >
                <Twitter size={20} />
                @airfusions
              </Link>
              <Link 
                href="https://github.com" 
                target="_blank"
                className="text-gray-300 hover:text-cyan-400 transition-colors flex items-center gap-2 bg-gray-800/50 px-4 py-2 rounded-full"
              >
                <Github size={20} />
                GitHub
              </Link>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Projects Section */}
      <section id="projects" className="relative py-20">
        <div className="absolute inset-0 bg-gradient-to-b from-gray-900/50 to-transparent" />
        <div className="container mx-auto px-4 relative">
          <motion.h2 
            className="text-3xl font-bold mb-12 text-cyan-400"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            Featured Projects
          </motion.h2>
          <div className="grid md:grid-cols-3 gap-6">
            {[
              {
                icon: <Brain className="w-10 h-10 text-cyan-400" />,
                title: "SolanaCryptoAI",
                description: "AI-powered platform for Solana blockchain offering comprehensive portfolio analysis, token swapping, and investment insights with AI-driven features.",
                tags: ["Solana", "AI", "Blockchain"],
                link: "https://github.com/yourusername/SolanaCryptoAI"
              },
              {
                icon: <Network className="w-10 h-10 text-purple-400" />,
                title: "DuaLex",
                description: "Dual language model system combining Meta Llama 2 8B for chat and specialized legal AI for Indian Penal Code questions.",
                tags: ["LLM", "Gradio", "Legal AI"],
                link: "https://github.com/yourusername/DuaLex"
              },
              {
                icon: <Cpu className="w-10 h-10 text-pink-400" />,
                title: "PostCare AI",
                description: "AI-powered platform for post-diagnostic patient support using specialized agents for nutrition, reporting, and intervention.",
                tags: ["Healthcare", "Crew AI", "ML"],
                link: "https://github.com/yourusername/PostCareAI"
              }
            ].map((project, i) => (
              <motion.div
                key={project.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.2 }}
              >
                <Card className="bg-gray-800/50 border-gray-700 backdrop-blur-sm hover:bg-gray-800/80 transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-cyan-500/10">
                  <CardContent className="p-6">
                    {project.icon}
                    <h3 className="text-xl font-bold mb-2 mt-4 text-cyan-400">{project.title}</h3>
                    <p className="text-gray-300 mb-4">{project.description}</p>
                    <div className="flex gap-2 flex-wrap mb-4">
                      {project.tags.map(tag => (
                        <Badge 
                          key={tag}
                          variant="secondary" 
                          className="bg-gray-700 text-cyan-400 hover:bg-gray-600"
                        >
                          {tag}
                        </Badge>
                      ))}
                    </div>
                    <Link href={project.link} className="text-purple-400 hover:text-purple-300 transition-colors flex items-center gap-2">
                      View Project <ExternalLink size={16} />
                    </Link>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Research Papers Section */}
      <section id="research" className="py-20">
        <div className="container mx-auto px-4">
          <motion.h2 
            className="text-3xl font-bold mb-12 text-cyan-400"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            Favorite Research Papers
          </motion.h2>
          <div className="space-y-6">
            {[
              {
                title: "Attention Is All You Need",
                description: "The groundbreaking paper that introduced the Transformer architecture, revolutionizing NLP.",
                tags: ["Transformers", "NLP", "Deep Learning"]
              },
              {
                title: "Deep Residual Learning for Image Recognition",
                description: "Introduced ResNet architecture, solving the vanishing gradient problem in deep networks.",
                tags: ["Computer Vision", "CNN", "ResNet"]
              }
            ].map((paper, i) => (
              <motion.div
                key={paper.title}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.2 }}
              >
                <Card className="bg-gray-800/50 border-gray-700 backdrop-blur-sm hover:bg-gray-800/80 transition-colors">
                  <CardContent className="p-6">
                    <h3 className="text-xl font-bold mb-2 text-cyan-400">{paper.title}</h3>
                    <p className="text-gray-300 mb-4">{paper.description}</p>
                    <div className="flex gap-2 flex-wrap">
                      {paper.tags.map(tag => (
                        <Badge 
                          key={tag}
                          variant="outline" 
                          className="border-purple-500/30 text-purple-400"
                        >
                          {tag}
                        </Badge>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="relative py-20">
        <div className="absolute inset-0 bg-gradient-to-t from-gray-900/50 to-transparent" />
        <div className="container mx-auto px-4 text-center relative">
          <motion.h2 
            className="text-3xl font-bold mb-8 text-cyan-400"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            Get In Touch
          </motion.h2>
          <motion.p 
            className="text-gray-300 mb-8 max-w-2xl mx-auto"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
          >
            I'm always interested in collaborating on innovative AI projects and research. 
            Feel free to reach out if you'd like to connect!
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <Link 
              href="mailto:contact@example.com"
              className="inline-flex items-center gap-2 bg-gradient-to-r from-cyan-500 to-purple-500 text-gray-900 px-6 py-3 rounded-lg hover:opacity-90 transition-opacity"
            >
              <Mail size={20} />
              Send Message
            </Link>
          </motion.div>
        </div>
      </section>
    </div>
  )
}

