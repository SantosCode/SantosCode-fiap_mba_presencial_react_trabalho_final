import { useRouter } from 'next/router';
import { ReactElement, useEffect } from 'react';
import { Routes } from "../../../utils/routes";
import { User } from "../../models/user";

interface Props {
  user?: User;
  hasStarted: boolean;
}

const SessionGate = ({ user, hasStarted }: Props): ReactElement | null => {
  const router = useRouter()

  useEffect(() => {
    if (!hasStarted) {
      return
    }

    if (user === undefined) {
      router.push(Routes.LOGIN)
      return
    }

    router.push(Routes.HOME)
  }, [user, hasStarted])

  return null
}

export default SessionGate;