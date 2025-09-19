import { Box, Heading, HStack, Stack } from '@chakra-ui/react'
import { FormProvider, useForm } from 'react-hook-form'
import { useEffect, useState } from 'react'
import { configService } from '../services/configService'
import type { CompanySettings, ChatSettings, EmailSettings, AppearanceSettings } from '../services/configService'
import TextField from '../components/form/TextField'
import SelectField from '../components/form/SelectField'
import TextareaField from '../components/form/TextareaField'
import NumberField from '../components/form/NumberField'
import SwitchField from '../components/form/SwitchField'
import MaskedTextField from '../components/form/MaskedTextField'
import FormSection from '../components/form/FormSection'
import FormActions from '../components/form/FormActions'

export default function SettingsPage() {
  const tabs = [
    { key: 'company', label: 'Empresa' },
    { key: 'chat', label: 'Chat' },
    { key: 'email', label: 'E-mail' },
    { key: 'appearance', label: 'Aparência' },
  ] as const
  type TabKey = typeof tabs[number]['key']
  const [active, setActive] = useState<TabKey>('company')
  return (
    <Box>
      <Heading size="md" mb={4}>Configurações</Heading>
      <HStack spacing={2} mb={0} overflowX="auto" overflowY="hidden" borderBottomWidth={0}
              sx={{ scrollbarWidth: 'none', msOverflowStyle: 'none', '::-webkit-scrollbar': { display: 'none' } }}>
        {tabs.map(t => (
          <HStack key={t.key}
                  as={Box}
                  onClick={() => setActive(t.key)}
                  px={3} py={2}
                  roundedTop="md" roundedBottom="0"
                  borderWidth="1px" borderBottomWidth={0} borderColor="gray.200"
                  bg={active === t.key ? 'white' : 'surface.200'}
                  color={active === t.key ? 'gray.800' : 'gray.600'}
                  _hover={{ bg: active === t.key ? 'white' : 'surface.200' }}
                  position="relative" top={active === t.key ? '1px' : '0'} zIndex={active === t.key ? 1 : 0} mb={-1}
                  cursor="pointer">
            <Box>{t.label}</Box>
          </HStack>
        ))}
      </HStack>

      <Box borderWidth="1px" borderTopWidth={0} borderColor="gray.200" rounded="md" roundedTop="0" p={4} bg="white" className="dxc-form"
           overflow="hidden"
           sx={{ scrollbarWidth: 'none', msOverflowStyle: 'none', '::-webkit-scrollbar': { display: 'none' } }}>
        {active === 'company' && <CompanyTab />}
        {active === 'chat' && <ChatTab />}
        {active === 'email' && <EmailTab />}
        {active === 'appearance' && <AppearanceTab />}
      </Box>
    </Box>
  )
}

function CompanyTab() {
  const form = useForm<CompanySettings>({ defaultValues: {} })
  useEffect(() => { configService.getCompany().then(form.reset).catch(() => {}) }, [])
  const onSubmit = form.handleSubmit(async (values) => { await configService.patchCompany(values) })
  return (
    <FormProvider {...form}>
      <Stack as="form" align="stretch" gap={4} onSubmit={onSubmit}>
        <FormSection title="Dados da Empresa">
          <Box display="grid" gap={3} gridTemplateColumns={{ base: '1fr', md: '1fr 1fr' }}>
            <TextField name="razao_social" label="Razão Social" />
            <TextField name="nome_fantasia" label="Nome Fantasia" />
          </Box>
          <Box display="grid" gap={3} gridTemplateColumns={{ base: '1fr', md: '1fr 1fr 1fr' }}>
            <MaskedTextField name="cnpj" label="CNPJ" mask="cnpj" />
            <TextField name="inscricao_estadual" label="Inscrição Estadual" />
            <SelectField name="regime_tributario" label="Regime Tributário" options={[{ value: '1', label: 'Simples' }, { value: '2', label: 'Lucro Presumido' }, { value: '3', label: 'Lucro Real' }]} />
          </Box>
          <Box display="grid" gap={3} gridTemplateColumns={{ base: '1fr', md: '1fr 1fr' }}>
            <MaskedTextField name="telefone" label="Telefone" mask="phone" />
            <TextField name="email" label="E-mail" />
          </Box>
        </FormSection>
        <FormSection title="Endereço">
          <Box display="grid" gap={3} gridTemplateColumns={{ base: '1fr', md: '160px 1fr 120px' }}>
            <MaskedTextField name="endereco.cep" label="CEP" mask="cep" />
            <TextField name="endereco.logradouro" label="Logradouro" />
            <TextField name="endereco.numero" label="Número" />
          </Box>
          <Box display="grid" gap={3} gridTemplateColumns={{ base: '1fr', md: '1fr 1fr 100px' }}>
            <TextField name="endereco.bairro" label="Bairro" />
            <TextField name="endereco.cidade" label="Cidade" />
            <TextField name="endereco.uf" label="UF" />
          </Box>
        </FormSection>
        <FormActions isSubmitting={form.formState.isSubmitting} />
      </Stack>
    </FormProvider>
  )
}

function ChatTab() {
  const form = useForm<ChatSettings>({ defaultValues: {} })
  useEffect(() => { configService.getChat().then(form.reset).catch(() => {}) }, [])
  const onSubmit = form.handleSubmit(async (values) => { await configService.patchChat(values) })
  return (
    <FormProvider {...form}>
      <Stack as="form" align="stretch" gap={4} onSubmit={onSubmit}>
        <FormSection title="Mensagens">
          <TextareaField name="mensagem_saudacao" label="Saudação" />
          <TextareaField name="mensagem_fora_expediente" label="Fora de Expediente" />
          <TextareaField name="mensagem_encerramento" label="Encerramento" />
          <TextareaField name="mensagem_inatividade" label="Inatividade" />
        </FormSection>
        <FormSection title="Parâmetros">
          <NumberField name="timeout_inatividade_minutos" label="Timeout de Inatividade (min)" min={0} step={1} />
          <NumberField name="limite_chats_simultaneos" label="Limite de chats simultâneos" min={1} step={1} />
        </FormSection>
        <FormActions isSubmitting={form.formState.isSubmitting} />
      </Stack>
    </FormProvider>
  )
}

function EmailTab() {
  const form = useForm<EmailSettings>({ defaultValues: {} })
  useEffect(() => { configService.getEmail().then(form.reset).catch(() => {}) }, [])
  const onSubmit = form.handleSubmit(async (values) => { await configService.patchEmail(values) })
  return (
    <FormProvider {...form}>
      <Stack as="form" align="stretch" gap={4} onSubmit={onSubmit}>
        <Box display="grid" gap={3} gridTemplateColumns={{ base: '1fr', md: '1fr 140px' }}>
          <TextField name="smtp_host" label="SMTP Host" />
          <NumberField name="smtp_port" label="SMTP Port" />
        </Box>
        <Box display="grid" gap={3} gridTemplateColumns={{ base: '1fr', md: '1fr 1fr' }}>
          <TextField name="smtp_usuario" label="SMTP Usuário" />
          <TextField name="smtp_senha" label="SMTP Senha" type="password" />
        </Box>
        <Box display="grid" gap={3} gridTemplateColumns={{ base: '1fr', md: 'auto 1fr' }} alignItems="center">
          <SwitchField name="smtp_ssl" label="SSL" />
          <TextField name="email_from" label="E-mail From" />
        </Box>
        <FormActions isSubmitting={form.formState.isSubmitting} />
      </Stack>
    </FormProvider>
  )
}

function AppearanceTab() {
  const form = useForm<AppearanceSettings>({ defaultValues: {} })
  useEffect(() => { configService.getAppearance().then(form.reset).catch(() => {}) }, [])
  const onSubmit = form.handleSubmit(async (values) => { await configService.patchAppearance(values) })
  return (
    <FormProvider {...form}>
      <Stack as="form" align="stretch" gap={4} onSubmit={onSubmit}>
        <Box display="grid" gap={3} gridTemplateColumns={{ base: '1fr', md: '1fr 1fr' }}>
          <TextField name="primary_color" label="Cor Primária" placeholder="#1c38b0" />
          <TextField name="secondary_color" label="Cor Secundária" placeholder="#5f84ff" />
        </Box>
        <FormActions isSubmitting={form.formState.isSubmitting} />
      </Stack>
    </FormProvider>
  )
}


