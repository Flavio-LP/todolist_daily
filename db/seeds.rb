recurring_tasks = [
  { title: "Ler 10 páginas de um livro", description: "Hábito de leitura diária" },
  { title: "Exercitar por 30 minutos", description: "Atividade física para manter a saúde" },
  { title: "Beber 2L de água", description: "Hidratação diária recomendada" },
  { title: "Meditar por 10 minutos", description: "Mindfulness para foco e bem-estar" },
  { title: "Revisar tarefas do dia", description: "Planejar e organizar as prioridades" }
]

recurring_tasks.each do |attrs|
  RecurringTask.find_or_create_by!(title: attrs[:title]) do |rt|
    rt.description = attrs[:description]
  end
end

puts "Seeds criados: #{RecurringTask.count} tarefas recorrentes"
